# Project Management Dashboard

A robust, full-stack project management application built with Next.js, Express, and MongoDB.



##  Daily Task Roadmap

### Day 1

-  Set up project with `client` and `server` folders. Initialize Express server with `cors`, `helmet`, and `dotenv`.
-  Connect to MongoDB Atlas.
-  Implement basic `/health` status route.

### Day 2

-  Implement User model (name, email, password).
-  Build `POST /register` and `POST /login` routes.
-  Secure passwords with `bcrypt` and sessions with `JWT`.

### Day 3

-  Create Project and Task models.
-  Implement full CRUD for Projects (Create/Read).
-  Implement Task management (Add, Delete, Mark as Done).
-  Verify API robustness with Postman.

### Day 4

-  Initialize Next.js application.
-  Set up project layout and folder structure.
-  Build Login and Register pages.
-  Save JWT tokens securely in HttpOnly cookies.

### Day 5

-  Build the Dashboard overview page.
-  Fetch and display project list from the API.
-  Restrict data visibility to authenticated user accounts.

### Day 6

-  Implement dynamic routing for Project Details (`/project/[id]`).
-  Build interactive task creation forms.
-  Implement real-time UI updates (Optimistic UI) for task management.

### Day 7

-  **Defense**: Comprehensive error handling with `sonner` toast notifications.
-  **Empty States**: Centered, helpful placeholders for new users on Projects and Tasks pages.
-  **Cleanup**: Systematic removal of console logs and developer comments.
-  **Documentation**: Final sync of all feature working documentation.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, TanStack Table, Sonner.
- **Backend**: Node.js, Express.js, MongoDB (Atlas).
- **Security**: JWT, Bcrypt, Helmet, HttpOnly Cookies.

##  Documentation

- [Client Documentation](client/docs)
- [Server Documentation](server/docs)
