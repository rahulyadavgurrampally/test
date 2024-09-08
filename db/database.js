import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Kishore",
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
