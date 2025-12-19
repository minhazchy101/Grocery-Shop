import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully..");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/groceryShop`);

    
  } catch (error) {
    console.log(`mongoose error => ${error.message}`);
  }
};

export default connectDB;
