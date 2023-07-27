import mongoose from "mongoose";
import { comment } from "postcss";

let isConnected = false


export  const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log("mongodb is already is connected")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })

        isConnected = true

        console.log('mongodb connected')
    } catch (error) {
        console.log(error)
    }
}