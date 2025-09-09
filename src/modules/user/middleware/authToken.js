import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config(); 

const secret = process.env.JWT_KEY; 

export const authToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return { user: decoded };
    } catch (error) {
        return { user: null };

    }
}