import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log("Database already connected");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "");
    isConnected = true;
    console.log("Database  connected successfully");
    return conn;
  } catch (error) {
    console.log("Database not connected", error);
    process.exit(1);
  }
};
export default dbConnect;
