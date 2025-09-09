import { users, comments } from "../dataSource.js";
export const postResolver = {
    author: (parent) => {
        return users.find(user => user.id === parent.authorId)
    },
    comments: (parent) => {
        return comments.filter(comment => comment.postId === parent.id); 
    }
}