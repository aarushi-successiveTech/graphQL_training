import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config(); 

const secret = process.env.JWT_KEY; 

export const authToken = async(token) => {

    try{
        const decoded = jwt.verify(token, secret); 
        return decoded;  
    }
    catch(error){
        console.log('token verification failed', error);
        return null; 
    }
}