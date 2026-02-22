import mongoose, { Schema, Document } from "mongoose";

interface ITask {
  _id?: mongoose.Types.ObjectId;
  title: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  tasks: mongoose.Types.DocumentArray<ITask>;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
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
    tasks: [TaskSchema],
  },
  { timestamps: true },
);

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
