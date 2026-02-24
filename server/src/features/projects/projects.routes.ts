import { Router } from "express";
import { ProjectsController } from "./projects.controller";

import { validate } from "../../common/middleware/validate.middleware";
import { auth } from "../../common/middleware/auth.middleware";

import { CreateProjectSchema } from "./dto/create-project.dto";
import { CreateTaskSchema } from "./dto/create-task.dto";

import { GetProjectsParamsSchema } from "./dto/get-projects.dto";
import { UpdateTaskParamsSchema } from "./dto/update-task-status.dto";
import { TaskParamsSchema } from "./dto/task-params.dto";
import { ProjectParamsSchema } from "./dto/project-params.dto";

const router = Router();
const controller = new ProjectsController();

router.use(auth);

router.post("/", validate(CreateProjectSchema), controller.createProject);

router.get(
  "/detail/:projectId",
  validate(ProjectParamsSchema, "params"),
  controller.getProjectById,
);

router.get(
  "/:userId",
  validate(GetProjectsParamsSchema, "params"),
  controller.getProjects,
);

router.patch(
  "/:projectId",
  validate(ProjectParamsSchema, "params"),
  validate(UpdateTaskParamsSchema), 
  controller.updateProjectStatus,
);

router.post(
  "/:projectId/tasks",
  validate(CreateTaskSchema),
  controller.addTask,
);

router.patch(
  "/:projectId/tasks/:taskId",
  validate(TaskParamsSchema, "params"),
  validate(UpdateTaskParamsSchema),
  controller.updateTaskStatus,
);

router.delete(
  "/:projectId/tasks/:taskId",
  validate(TaskParamsSchema, "params"),
  controller.deleteTask,
);

export default router;
