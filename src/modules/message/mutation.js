import { pubsub } from "../../server/pubsub.js";
import { messages } from "./dataSource.js";

export const messageMutationResolvers = {
  postMessage: async(_, { content, author }) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      author,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    await pubsub.publish("MESSAGE_POSTED", {messagePosted: newMessage}); 
    return newMessage;
  },

};