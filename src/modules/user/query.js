import { User } from "./model/userModel.js";

export const userQueryResolvers = {

    displayUsers: async(_, __, context) => {
        console.log('Resolver context:', context);
        console.log('context: ', context.user); 
        
        if(!context.user){
            throw new Error('Not authenticated');
        }
        authRole(context.user, ['admin']); 
        const allUsers = await User.find();
        return allUsers; 
    }
}