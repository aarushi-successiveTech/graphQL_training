import { User } from "./model/userModel.js";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
import { pubsub } from "../../server/pubsub.js";
dotenv.config(); 

const secret = process.env.JWT_KEY; 

export const userMutationResolvers = {

    addUser : async(_, {name, email, password, role}) => {
        try{
            const hashPassword = await bcrypt.hash(password, 10); 
            const newUser = new User({name, email, password: hashPassword, role});
            const saved  = await newUser.save();
            return saved; 
        }
        catch(error){
            console.log('error adding user', error);
            throw new Error('Failed to add new user'); 
        }
    },

    loginUser : async(_, {email, password}) => {
        try{
            const existing = await User.findOne({email}); 
            if(!existing){
                throw new Error('user not found!'); 
            }
            const matched = await bcrypt.compare(password, existing.password); 
            if(!matched){
                throw new Error('Incorrect login Password!');
            }

            // marking user online
            existing.isOnline = true; 
            await existing.save(); 

            // online subscription 
            pubsub.publish("USER_ONLINE",{ userOnline: existing}); 
            console.log('user has loggedIn and is online'); 

            const token = jwt.sign({
                name: existing.name, 
                email: existing.email, 
                role: existing.role
            }, secret);
            return {
                token
            }
        }
        catch(error){
            console.log('login unsuccessful', error); 
        }
    },

    logOutUser : async(_, __, context) => {
        let user = context.user;
        let dbUser = await User.findOne({_id: user.user._id}); 
        console.log('user found', dbUser); 

        if(!dbUser){
            throw new Error('user not found!'); 
        }

        if(dbUser.isOnline === false){
            throw new Error('user is not online'); 
        }
        dbUser.isOnline = false; 
        await dbUser.save(); 

        pubsub.publish("USER_OFFLINE", {userOffline: dbUser}); 
        console.log('user has loggedOut and is offline!'); 
        return true; 

    }
}; 