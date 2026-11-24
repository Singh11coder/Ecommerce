import mongoose from "mongoose";

const connectDB = async(req,res) => {
  try{
    await mongoose.connect();
    console.log("MongoDB Connected Successfully");
  }
  catch(error){
    console.log("Error in connecting with DB ",error);
  }
}

export default connectDB;