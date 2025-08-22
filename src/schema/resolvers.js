import { bloggingModule } from "../modules/blog/index.js";
import { messageModule } from "../modules/message/index.js";
import { postResolver } from "../modules/blog/resolvers/postResolver.js";
import { commentResolver } from "../modules/blog/resolvers/commentResolver.js";
import { userModule } from "../modules/user/index.js";
import { messageSubscriptionResolvers } from "../modules/message/subscription.js";
import { userSubscriptionResolver } from "../modules/user/subscription.js";
import { chatModule } from "../modules/chat/index.js";

export const resolvers = {
    Query: {
        ...messageModule.Query,
        ...bloggingModule.Query,
        ...userModule.Query,
        ...chatModule.Query
    },
    Mutation: {
        ...messageModule.Mutation,
        ...bloggingModule.Mutation, 
        ...userModule.Mutation, 
        ...chatModule.Mutation
    }, 
    Subscription:{
        ...messageSubscriptionResolvers, 
        ...userSubscriptionResolver
    },
    Post : postResolver, 
    Comment : commentResolver, 

    commentResult: {
        __resolveType(obj){
            if(obj.message){
                return "customError"
            }
            return "comment"
        }
    }
}; 