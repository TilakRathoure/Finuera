import mongoose from "mongoose";
import { Boldonse } from "next/font/google";

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select:false,
  },

  googleID: {
    type: String,
    required:true,
  },
});

export const User=mongoose.models?.User || mongoose.model("User",Schema);


  
