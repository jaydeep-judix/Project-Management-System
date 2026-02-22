import { z } from "zod";

export const GetProjectsParamsSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export type GetProjectsParamsDto = z.infer<typeof GetProjectsParamsSchema>;
