import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response";
export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusMap: Record<string, number> = {
    VALIDATION_ERROR: 400,
    EMAIL_ALREADY_EXISTS: 409,
    UNAUTHORIZED: 401,
  };

  const status = statusMap[err.code] || 500;

  return res
    .status(status)
    .json(
      errorResponse(
        err.code || "INTERNAL_SERVER_ERROR",
        err.message || "Something went wrong",
        err.field || null,
      ),
    );
};
