# Dashboard Overview

The Dashboard is the central hub for users to view a summary of their projects and tasks. Recently, it was converted from a static server component to a dynamic client component that fetches data live from the backend API.

## Core Components

- **Greeting Component**: (`client/components/dashboard/Greeting.tsx`)
  - A client component that fetches the currently authenticated user's name via `authService.getCurrentUser()` and displays a localized, real-time date string. Includes a skeleton pulse animation while fetching.

- **Stat Cards**:
  - Displays high-level aggregated metrics across all projects (e.g., "Projects Completed", "In Progress", "Pending").
  - Data is computed dynamically by iterating through the user's projects list and counting tasks by `status`.

- **Task Overview (PieChart)**:
  - Visualizes the distribution of tasks by their status (`pending`, `in-progress`, `done`).
  - Implemented using a custom donut chart and segmented data mapped to task statuses.

- **Recent Projects**: (`client/components/dashboard/RecentProjects.tsx`)
  - Displays the 3 most recently created projects using dynamic data.
  - Maps project status to specific UI colors (`done: bg-emerald-500`, etc.) and formats creation dates elegantly.

- **Sidebar & Navbar**:
  - The Sidebar contains the main site navigation and a fully functional logout button that calls `authService.logout()`, clearing the httpOnly cookie and forcing a page reload to trigger `middleware.ts` protections.
  - The Navbar features a `NewProjectDialog` component embedded within the original UI button, allowing users to create new projects without leaving the dashboard context. On success, the dashboard refreshes to show the updated statistics and recent projects list.
