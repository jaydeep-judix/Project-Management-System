import mongoose from "mongoose";

export const connectDatabase = async () => {
    try{
        const Mongo_url = process.env.MONGO_URL;
        if(!Mongo_url)
        {
            throw new Error("MONGO_URL variable not defined in env.")
        }
        await mongoose.connect(Mongo_url);
        console.log("MongoDB Connected")
    }
    catch{
        throw new Error("MongoDB Connection Failed")
    }
};
