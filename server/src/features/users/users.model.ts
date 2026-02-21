import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./interfaces/users.interface";

const UsersSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, 
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const UserModel = mongoose.model<IUser>(
  "User",
  UsersSchema
);
