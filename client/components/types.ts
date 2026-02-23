export type AuthFormProps = React.ComponentProps<"div"> & {
  type: "login" | "register";
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type DashboardStats = {
  completed: number;
  inProgress: number;
  pending: number;
  totalTasks: number;
  doneTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  recentProjects: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  }[];
};