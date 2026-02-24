# Dashboard Overview

The Dashboard is the central hub for users to view a summary of their projects and tasks. Recently, it was converted from a static server component to a dynamic client component that fetches data live from the backend API. It features premium UX elements like skeleton loaders to eliminate jarring layout shifts during data loading.

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
  - **Premium Loading**: Uses a `Skeleton` component to provide pulsing placeholders while projects are being fetched.
  - **UX Enhancement**: Features a dedicated empty state with a "New Project" call-to-action if the user has no projects yet.

- **Sidebar & Navbar**:
  - The Sidebar contains the main site navigation and a fully functional logout button. It is designed to be fully responsive and scrollable, ensuring all projects and the logout button remain accessible on all screen sizes.
  - The Navbar features a `NewProjectDialog` component, allowing users to create new projects without leaving the dashboard context.
  - **Dynamic Context**: Powered by `ProjectContext.tsx`, which automatically re-refreshes data when the user navigates back to the dashboard (via `usePathname`), ensuring metrics are always up to date.
