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
    required: true,
  },

  googleID: {
    type: String,
    required:true,
  },
});
