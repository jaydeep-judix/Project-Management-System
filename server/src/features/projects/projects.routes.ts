import { Router } from "express";
import { ProjectsController } from "./projects.controller";

import { validate } from "../../common/middleware/validate.middleware";
import { auth } from "../../common/middleware/auth.middleware";

import { CreateProjectSchema } from "./dto/create-project.dto";
import { CreateTaskSchema } from "./dto/create-task.dto";
import { UpdateTaskParamsSchema } from "./dto/update-task-status.dto";
import { GetProjectsParamsSchema } from "./dto/get-projects.dto";

const router = Router();
const controller = new ProjectsController();

router.use(auth);

router.post("/", validate(CreateProjectSchema), controller.createProject);

router.get(
  "/:userId",
  validate(GetProjectsParamsSchema, "params"),
  controller.getProjects,
);

router.post(
  "/:projectId/tasks",
  validate(CreateTaskSchema),
  controller.addTask,
);

router.patch(
  "/:projectId/tasks/:taskId",
  validate(UpdateTaskParamsSchema, "params"),
  controller.markTaskDone,
);

router.delete(
  "/:projectId/tasks/:taskId",
  validate(UpdateTaskParamsSchema, "params"),
  controller.deleteTask,
);

export default router;
