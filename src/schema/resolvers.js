import { blogQueryResolvers } from "../modules/blog/query.js";
import { messageModule } from "../modules/message/index.js";

export const resolvers = {
    Query: {
        ...messageModule.Query,
        ...blogQueryResolvers
    },
    Mutation: {
        ...messageModule.Mutation,
    }, 
}; 