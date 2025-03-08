import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("MONGOBD_URI not defined")

  if (isConnected) return console.log("User existing db connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log("DB connected...");
  } catch (error) {
    console.log(error);
  }
}
