import { posts } from "../dataSource.js";

export const commentResolver = {
    post: (parent) => {
        return posts.find(p => p.id === parent.postId); 
    }
}; 