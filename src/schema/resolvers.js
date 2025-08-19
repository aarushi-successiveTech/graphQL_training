import { bloggingModule } from "../modules/blog/index.js";
import { messageModule } from "../modules/message/index.js";
import { postResolver } from "../modules/blog/resolvers/postResolver.js";
import { commentResolver } from "../modules/blog/resolvers/commentResolver.js";
import { userModule } from "../modules/user/index.js";

export const resolvers = {
    Query: {
        ...messageModule.Query,
        ...bloggingModule.Query,
        ...userModule.Query
    },
    Mutation: {
        ...messageModule.Mutation,
        ...bloggingModule.Mutation, 
        ...userModule.Mutation
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