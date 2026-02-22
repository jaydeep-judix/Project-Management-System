import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import healthRoutes from "./features/health/health.routes";
import UserRoutes from "./features/users/users.routes";
import projectsRoutes from "./features/projects/projects.routes";
import { connectDatabase } from "./config/database";
import { globalErrorHandler } from "./common/middleware/error.middleware";
dotenv.config();
const app = express();
const FrontendUrl=process.env.FRONTEND_URL;
app.use(
  cors({
    origin: [`${FrontendUrl}`],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/users", UserRoutes);
app.use("/projects", projectsRoutes);
app.use(globalErrorHandler);
export const startApp = async () => {
  await connectDatabase();
  return app;
};
