import { z } from "zod";

export const ProjectParamsSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
});

export type ProjectParamsDto = z.infer<typeof ProjectParamsSchema>;
