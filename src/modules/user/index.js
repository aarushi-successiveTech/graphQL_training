import { userQueryResolvers } from "./query.js";
import { userMutationResolvers } from "./mutation.js";

export const userModule = {
    Query: userQueryResolvers, 
    Mutation: userMutationResolvers
}