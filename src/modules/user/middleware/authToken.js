import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config(); 

const secret = process.env.JWT_KEY; 

export const authToken = (token) => {
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //     throw new Error('invalid request header');
    // }
    // const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        return { user: decoded };
    } catch (error) {
        return { user: null };
    }
}