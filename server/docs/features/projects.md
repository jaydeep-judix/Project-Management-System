# Projects Management Feature

### Purpose

This feature allows users to organize their work by creating projects and managing tasks within those projects. It provides a structured way to track progress on different initiatives, ensuring that every task is linked to a specific project and every project is owned by a user.

### Public APIs

- **POST `/projects`**
  - **Payload**: `name`, `userId`.
  - **Details**: Creates a new project for a specific user.
  - **Validation**: Requires a name and a valid user ID.

- **GET `/projects/:userId`**
  - **Details**: Fetches all projects associated with a particular user.
  - **Validation**: User ID must be provided in the URL.

- **POST `/projects/:projectId/tasks`**
  - **Payload**: `title`.
  - **Details**: Adds a new task to an existing project.
  - **Validation**: Requires a non-empty task title.

- **PATCH `/projects/:projectId`**
  - **Payload**: `status`
  - **Details**: Updates the status of a specific project (e.g., to 'done' or 'in-progress').
  - **Validation**: Project ID must be valid and status must be one of the allowed enums.

- **PATCH `/projects/:projectId/tasks/:taskId`**
  - **Payload**: `status`
  - **Details**: Updates the status of a specific task.
  - **Validation**: Both project and task IDs must be valid. Status must be one of the allowed enums (e.g., pending, in-progress, done).

- **DELETE `/projects/:projectId/tasks/:taskId`**
  - **Details**: Removes a task from a project permanentely.

### Business Rules

- **Access Control**: You must be logged in to access any project-related endpoints. Every request requires a valid JWT token in the `token` cookie.
- **Ownership**: Projects are strictly tied to the `userId` provided during creation.
- **Task Management**: Tasks are sub-documents of a project. They have a lifecycle tracked by their `status` field (pending, in-progress, done).
- **Safe Deletion**: Deleting a task is permanent and cannot be undone via the API.
