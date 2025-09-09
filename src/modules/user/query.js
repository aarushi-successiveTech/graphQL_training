import { User } from "./model/userModel.js";

export const userQueryResolvers = {

    displayUsers: async(_, __, context) => {
        if(!context.user){
            throw new Error('Not authenticated');
        }
        console.log(context.user)
        // authRole(context.user, ['admin']); 
        const allUsers = await User.find();
        return allUsers; 
    }
}