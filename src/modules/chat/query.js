import { Chat } from "./model/chatModel.js";

export const chatQueryResolvers = {

    allChats :  async(_, {sender, receiver}) => {
        try{
            const allChats = await Chat.find({
                $or: [
                    {sender, receiver}, 
                    {sender: receiver, receiver: sender}
                ]
            }); 

            return allChats; 
        }
        catch(error){
            console.log('invalid sender or receiver details');
            throw new Error('enter valid sender or receiver details'); 
        }
    }
}