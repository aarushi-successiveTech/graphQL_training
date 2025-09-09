export const authRole = (user, allowedRoles)=> {
    if(!user){
        throw new Error('user not authenticated');
    }
    if(!allowedRoles.includes(user.role)){
        throw new Error('Unauthenticated user!');
    }
}