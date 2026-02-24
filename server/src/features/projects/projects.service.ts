import { ProjectsRepository } from "./projects.repository";

export class ProjectsService {
  private repo = new ProjectsRepository();

  async createProject(userId: string, name: string) {
    return this.repo.create({ userId, name });
  }

  async getProjects(userId: string) {
    return this.repo.findByUser(userId);
  }

  async getProjectById(projectId: string) {
    const project = await this.repo.findById(projectId);
    if (!project) {
      throw {
        code: "NOT_FOUND",
        message: "Project not found",
        field: null,
      };
    }
    return project;
  }

  async addTask(projectId: string, title: string) {
    const project = await this.repo.findById(projectId);

    if (!project) {
      throw {
        code: "NOT_FOUND",
        message: "Project not found",
        field: null,
      };
    }

    project.tasks.push({ title, status: "pending" } as any);
    return this.repo.save(project);
  }

  async updateTaskStatus(projectId: string, taskId: string, status: string) {
    const project = await this.repo.findById(projectId);

    if (!project) {
      throw {
        code: "NOT_FOUND",
        message: "Project not found",
        field: null,
      };
    }

    const task = project.tasks.id(taskId);

    if (!task) {
      throw {
        code: "NOT_FOUND",
        message: "Task not found",
        field: null,
      };
    }

    task.status = status as any;
    return this.repo.save(project);
  }

  async updateProjectStatus(projectId: string, status: string) {
    const project = await this.repo.findById(projectId);

    if (!project) {
      throw {
        code: "NOT_FOUND",
        message: "Project not found",
        field: null,
      };
    }

    project.status = status as any;
    return this.repo.save(project);
  }

  async deleteTask(projectId: string, taskId: string) {
    return this.repo.deleteTask(projectId, taskId);
  }
}
