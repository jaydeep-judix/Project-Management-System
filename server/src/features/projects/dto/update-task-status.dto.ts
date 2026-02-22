import { z } from "zod";

export const UpdateTaskParamsSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  taskId: z.string().min(1, "Task ID is required"),
});

export type UpdateTaskParamsDto = z.infer<typeof UpdateTaskParamsSchema>;
