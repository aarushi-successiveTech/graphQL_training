import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config(); 

const secret = process.env.JWT_KEY; 

export const authToken = (req) => {

    const authHeader = req.headers.authorization; 

    const token = authHeader.startsWith('Bearer ')? authHeader.split(' ')[1]: null; 
    if(!token){
        throw new Error('invalid request header');
    }
    try{
        const decoded = jwt.verify(token, secret); 
    return{
        user: decoded}
    }
    catch(error){
        return {user : null}
    }
}