import { chatMutationResolvers } from "./mutation.js";
import { chatQueryResolvers } from "./query.js";

export const chatModule = {
    Query: chatQueryResolvers, 
    Mutation: chatMutationResolvers
}; 