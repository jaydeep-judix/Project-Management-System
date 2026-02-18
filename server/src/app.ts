import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import healthRoutes from "./features/health/health.routes";
import { connectDatabase } from "./config/database";
dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/health", healthRoutes);
export const startApp = async () => {
    await connectDatabase();
    return app;
};
