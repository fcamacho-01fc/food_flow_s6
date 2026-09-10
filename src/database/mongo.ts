import mongoose from "mongoose";
import { env } from "../config/env";

export async function connectMongoDB() {
  await mongoose.connect(env.mongo.uri);

  console.log("MongoDB connected");
}

export async function disconnectMongoDB() {
  await mongoose.disconnect();
}
