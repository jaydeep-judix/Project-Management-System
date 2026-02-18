import { Request, Response } from "express";
import { HealthService } from "./health.service";
const healthService =  HealthService();
export const getHealth = async (_req: Request, res: Response) => {
  const result = healthService.getStatus();
  return res.status(200).json(
    {
        status:"Active"
    }
  );
};
