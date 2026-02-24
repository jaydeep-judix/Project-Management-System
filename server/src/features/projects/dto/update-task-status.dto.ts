import { z } from "zod";


export const UpdateTaskBodySchema = z.object({
  status: z.enum(["pending", "in-progress", "done"]),
});

export type UpdateTaskBodyDto = z.infer<typeof UpdateTaskBodySchema>;

export const UpdateTaskParamsSchema = UpdateTaskBodySchema;
export type UpdateTaskParamsDto = UpdateTaskBodyDto;
