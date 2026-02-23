import { apiClient } from "@/lib/api-client";

export const projectService = {
  getProjects: async (userId: string) => {
    const res = await apiClient(`/projects/${userId}`);
    return res.data;
  },

  createProject: async (name: string, userId: string) => {
    const res = await apiClient("/projects", {
      method: "POST",
      body: JSON.stringify({ name, userId }),
    });
    return res.data;
  },

  addTask: async (projectId: string, title: string) => {
    const res = await apiClient(`/projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    return res.data;
  },

  updateTaskStatus: async (
    projectId: string,
    taskId: string,
    status: string,
  ) => {
    const res = await apiClient(`/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  deleteTask: async (projectId: string, taskId: string) => {
    const res = await apiClient(`/projects/${projectId}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return res.data;
  },
};
