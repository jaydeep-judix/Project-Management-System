import mongoose, { Schema, Document } from "mongoose";

interface ITask {
  _id?: mongoose.Types.ObjectId;
  title: string;
  status: "pending" | "in-progress" | "done";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  status: "pending" | "in-progress" | "done";
  tasks: mongoose.Types.DocumentArray<ITask>;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done"],
      default: "pending",
    },
    tasks: [TaskSchema],
  },
  { timestamps: true },
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
