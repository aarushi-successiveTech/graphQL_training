import { Chat } from "./model/chatModel.js";

export const chatMutationResolvers = {

    postChat : async(_, {content, sender, receiver}) => {
        try{
            const newChat = new Chat({
                id: String(Date.now()),
                content,
                sender, 
                receiver
            })
            await newChat.save();  
            console.log('chat sent');
            return newChat; 
        }
        catch(error){
            console.log(error); 
            throw new Error('Invalid data');
        }
    }
}