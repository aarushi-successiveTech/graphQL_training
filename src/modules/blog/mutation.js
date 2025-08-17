import { users } from "./dataSource.js";
import { comments } from "./dataSource.js";
import { posts } from "./dataSource.js";
export const blogMutationResolvers = {

    updateUser : (_, {id, name, email}) => {
        const user = users.find(u => u.id === id); 
        if(!user)throw new Error('user not found');

        if(name !== undefined ){
            user.name = name; 
        }
        if(email !== undefined){
            user.email = email; 
        }
        return user; 
    }, 
    deleteComment: (_, {id}) => {
        const index = comments.findIndex(c => c.id === id); 
        if(index === -1){
            return{
                __typename : "customError", 
                message: "comment not found", 
                status: "400"
            }
        }
        else {
        const [deleted] = comments.splice(index,1);
        return{
            __typename: 'Comment', 
            ...deleted
        }

        }
    }, 

    addPost: (_, {title, author}) => {
        const newPost = {
            id : String(posts.length + 1), 
            title, 
            author, 
        }
        posts.push(newPost); 
        return newPost; 
    }, 

    addComment : (_, {content, postId}) => {
        const newComment = {
            id : String(comments.length + 1),
            content, 
            postId
        }; 
        comments.push(newComment); 
        return newComment; 
    }
}