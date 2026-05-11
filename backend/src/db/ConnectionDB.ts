import mongoose from 'mongoose';

const connectionDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI!); 
        console.log("MONGODB Connected Successfully!");
    } catch (error:unknown) {
        console.log("MONGODB connection FAILED ", error);
    }
};

export default connectionDB;