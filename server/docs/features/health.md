# Health Check Feature

### Purpose

The health feature is a simple heartbeat mechanism. It's used by monitoring tools, load balancers, or the frontend to verify that the server is alive and responding to requests.

### Public APIs

- **GET `/health`**
  - **Description**: Returns the current server status.
  - **Success Response**: `200 OK` with `{"status": "Active"}`.

### Business Rules

- The endpoint doesn't require authentication.
- It should return a successful response as long as the Express process is running.
- No database check is performed in this basic implementation.
