import { ProjectModel } from "./projects.model";

export class ProjectsRepository {
  async create(data: any) {
    return ProjectModel.create(data);
  }

  async findByUser(userId: string) {
    return ProjectModel.find({ userId });
  }

  async findById(id: string) {
    return ProjectModel.findById(id);
  }

  async save(project: any) {
    return project.save();
  }

  async deleteTask(projectId: string, taskId: string) {
    return ProjectModel.updateOne(
      { _id: projectId },
      { $pull: { tasks: { _id: taskId } } },
    );
  }
}
