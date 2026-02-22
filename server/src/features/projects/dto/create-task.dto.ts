import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(200, "Task title must be under 200 characters"),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
