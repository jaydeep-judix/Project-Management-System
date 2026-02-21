import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return next({
        code: "VALIDATION_ERROR",
        message: firstError.message,
        field: firstError.path[0] || null,
      });
    }

    req.body = result.data;
    next();
  };
