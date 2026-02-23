export type TaskOverviewProps = {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  className?: string;
};
export type Project = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
};

export type RecentProjectsProps = {
  className?: string;
  projects: Project[];
  loading?: boolean;
};
