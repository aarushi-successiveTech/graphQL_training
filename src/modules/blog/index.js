import { blogMutationResolvers } from "./mutation.js";
import { blogQueryResolvers } from "./query.js";


export const bloggingModule = {
    Query:blogQueryResolvers,
    Mutation:blogMutationResolvers
}