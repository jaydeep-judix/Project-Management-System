import { z } from "zod";

// Validates only the body: { status }
export const UpdateTaskBodySchema = z.object({
  status: z.enum(["pending", "in-progress", "done"]),
});

export type UpdateTaskBodyDto = z.infer<typeof UpdateTaskBodySchema>;

// Keep old name as alias for backward compat
export const UpdateTaskParamsSchema = UpdateTaskBodySchema;
export type UpdateTaskParamsDto = UpdateTaskBodyDto;
