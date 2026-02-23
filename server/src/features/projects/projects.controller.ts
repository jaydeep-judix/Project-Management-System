import { Request, Response } from "express";
import { ProjectsService } from "./projects.service";
import { successResponse } from "../../common/utils/response";

export class ProjectsController {
  private service = new ProjectsService();

  createProject = async (req: Request, res: Response) => {
    const result = await this.service.createProject(
      req.body.userId,
      req.body.name,
    );
    return res.status(201).json(successResponse(result));
  };

  getProjects = async (req: Request, res: Response) => {
    const result = await this.service.getProjects(req.params.userId as string);
    return res.status(200).json(successResponse(result));
  };

  addTask = async (req: Request, res: Response) => {
    const result = await this.service.addTask(
      req.params.projectId as string,
      req.body.title,
    );
    return res.status(200).json(successResponse(result));
  };

  updateTaskStatus = async (req: Request, res: Response) => {
    const result = await this.service.updateTaskStatus(
      req.params.projectId as string,
      req.params.taskId as string,
      req.body.status,
    );
    return res.status(200).json(successResponse(result));
  };

  deleteTask = async (req: Request, res: Response) => {
    await this.service.deleteTask(
      req.params.projectId as string,
      req.params.taskId as string,
    );
    return res.status(200).json(successResponse({}));
  };
}
