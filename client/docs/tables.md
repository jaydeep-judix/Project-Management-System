# Tables and Data Handling

The application uses **TanStack Table (React Table v8)** combined with **Shadcn UI** components to render robust, sortable, and filterable data tables for Projects and Tasks.

## Generic Types Extraction

To maintain clean architecture and prevent circular dependencies, table-related interfaces and types have been extracted into localized `types/types.ts` files within their respective component folders.

- **`client/components/projects/types/types.ts`**:
  - Contains `ProjectTask`, `ProjectStatus`, `Project`, and generic prop interfaces like `DataTableProps`, `DataTableToolbarProps`, and `DataTableFacetedFilterProps`.
- **`client/components/tasks/types/types.ts`**:
  - Contains `ProjectTaskDetail` and tasks-specific generic interfaces.

## Implementation Details

### Sequential IDs

Instead of displaying raw MongoDB ObjectIds (which are long and user-unfriendly), the tables compute a sequential ID (`1`, `2`, `3`...) on the fly using the TanStack Table row index: `row.index + 1`. This provides a clean UX while the underlying data operations still reliably use the `_id` field.

### Status Indicators

Project and Task statuses (`pending`, `in-progress`, `done`) are displayed using dynamic badges (`ProjectStatusBadge.tsx`) complete with SVG icons and color-coding mapped to the specific status string.

### Actions & Inline Updates

The tables use a dropdown menu via the `actions` column to allow users to update the status of a specific row inline or delete the item entirely. These actions directly call the `project-service.ts` methods and then hit the API.

### Toolbar & Search

The `DataTableToolbar` exposes a global text search input that filters across all columns and integrates faceted filters for specific string-based categories (like filtering tasks by `status`).
