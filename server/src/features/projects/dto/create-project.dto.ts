import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be under 100 characters"),
  userId: z.string().min(1, "User ID is required"),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
