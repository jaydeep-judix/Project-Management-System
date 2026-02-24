# Tables and Data Handling

The application uses **TanStack Table (React Table v8)** combined with **Shadcn UI** components to render robust, sortable, and filterable data tables for Projects and Tasks.

## Generic Types Extraction

To maintain clean architecture and prevent circular dependencies, table-related interfaces and types have been extracted into localized `types/types.ts` files within their respective component folders.

- **`client/components/projects/types/types.ts`**:
  - Contains `ProjectTask`, `ProjectStatus`, `Project`, and generic prop interfaces like `DataTableProps`, `DataTableToolbarProps`, and `DataTablePaginationProps`.
- **`client/components/tasks/types/types.ts`**:
  - Contains `ProjectTaskDetail` and tasks-specific generic interfaces.

## Implementation Details

### Sequential IDs

Instead of displaying raw MongoDB ObjectIds (which are long and user-unfriendly), the tables compute a sequential ID (`1`, `2`, `3`...) on the fly using the TanStack Table row index: `row.index + 1`. This provides a clean UX while the underlying data operations still reliably use the `_id` field.

### Status Indicators

Project and Task statuses (`pending`, `in-progress`, `done`) are displayed using dynamic badges and color-coded icons standard across the entire dashboard (e.g., Orange for In Progress, Green for Done).

### Pagination

Both Projects and Tasks tables utilize a reusable `DataTablePagination.tsx` component. It allows users to:

- Navigate through multiple pages of data.
- Adjust the number of rows displayed per page (10, 20, 30, 40, 50).
- View total row counts and selection status.

### Actions & Inline Updates

The tables use a dropdown menu via the `actions` column to allow users to update status or delete items inline.

- **Robustness**: All inline actions include optimistic UI updates and `sonner` toast notifications for immediate success/error feedback.
- **Defense**: If an API call fails, the system provides a polite error toast instead of crashing or leaving the user in an uncertain state.

### Empty States

When no projects or tasks are found (or while initial loading is taking place), the application displays centered, high-quality empty states.

- **Projects Page**: Features a large dashed-border placeholder with a direct "New Project" call-to-action.
- **Dashboard**: Integrated "Create Project" button within the Recent Projects card.

### Toolbar & Search

The `DataTableToolbar` exposes a global text search input that filters across all columns, providing a fast and intuitive way to find specific items.
