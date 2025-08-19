import mongoose from "mongoose";
const MONGO_URL = "mongodb://localhost:27017/graphDB"; 

export const connectDB = async() => {
    try{
        await mongoose.connect(MONGO_URL); 
        console.log('connected to db');
    }
    catch(error){
        console.log('error connecting to db', error); 
    }
}