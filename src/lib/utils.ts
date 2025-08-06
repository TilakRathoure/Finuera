import { clsx, type ClassValue } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectdb = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;

    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        dbName: "Finuero",
      }
    );

    console.log(`Connected to database: ${connection.host}`);
  } catch (error) {
    console.log("error while connecting database", error);
  }
};
