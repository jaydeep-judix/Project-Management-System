import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>, source: "body" | "params" | "query" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const firstError = result.error.issues[0];

      return next({
        code: "VALIDATION_ERROR",
        message: firstError.message,
        field: firstError.path[0] || null,
      });
    }

    req[source] = result.data;
    next();
  };
