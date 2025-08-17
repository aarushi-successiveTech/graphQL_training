import { users,posts,comments } from "./dataSource.js";

export const blogQueryResolvers = {
    
    users: async()=> {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        return users; 
    },

    user:async(_,{id}) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return users.find(user => user.id === id)},

    posts: async() => {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return posts},

    post: async(_,{id})=> {
        await new Promise(resolve => setTimeout(resolve, 1200));
        return posts.find(post => post.id === id)},

    comments: async()=> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return comments},

    comment: async(_,{id}) => {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        return comments.find(comment => comment.id===id)}, 

    paginatedPosts: (_, {page, limit, sortOrder = "ASC"}) => {

        if(page < 1 || limit < 1){
            throw new Error('Invalid page or limit'); 
        }

        const sorted = [...posts].sort((a,b)=> {
            const idA = parseInt(a.id); 
            const idB = parseInt(b.id); 
            return sortOrder === 'DESC'? idB - idA : idA - idB; 
        }); 
        const skip = (page - 1) * limit; 
        return sorted.slice(skip, skip + limit); 
    }
  
};