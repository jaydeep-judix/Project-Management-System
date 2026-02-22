import { ITask } from "./task.interface";

export interface IProject {
  id: string;
  name: string;
  userId: string;
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}