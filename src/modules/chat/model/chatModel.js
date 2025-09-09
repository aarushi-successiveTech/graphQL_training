import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender: {type: String},
    receiver: {type: String}, 
    content: {type: String}
}); 

export const Chat = mongoose.model('chat', chatSchema, 'chats'); 