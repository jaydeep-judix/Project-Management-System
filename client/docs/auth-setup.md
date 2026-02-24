# Authentication Setup

## Architecture

The system uses a secure cookie-based authentication flow:

1.  **Login/Register**: User submits credentials via the `AuthForm`.
2.  **Server Response**: On success, the server generates a JWT and sets it in an **HttpOnly, Secure (in production)** cookie named `token` scoped to the root path (`/`).
3.  **Automatic Persistence**: Browsers automatically include this cookie in subsequent requests to the same domain.
4.  **Client-side Access**: The frontend does not need to (and cannot) read the cookie directly, protecting it from XSS. The `apiClient` uses `credentials: 'include'` to handle this.
5.  **Route Protection**: Next.js Edge Middleware intercepts page requests, checking for the `token` cookie to protect dashboard routes or redirect authenticated users away from login pages.
6.  **Logout**: The client calls `POST /users/logout` which clears the `token` cookie from the browser, followed by a full page reload to trigger middleware redirection.

## Components

### Backend (Express)

- **`src/app.ts`**: Configured with `cookie-parser` and CORS to allow credentials from `FRONTEND URL`.
- **`src/features/users/users.controller.ts`**:
  - `login`: Attaches the JWT cookie to the response.
  - `logout`: Clears the JWT cookie ensuring `path: "/"` is used.
  - `me`: Reads the user ID from the validated JWT and returns the user profile.

### Frontend (Next.js)

- **`middleware.ts`**: Edge middleware that protects `/dashboard`, `/projects`, `/tasks` by verifying the `token` cookie's presence. Redirects `/` to `/register`.
- **`lib/api-client.ts`**: Reusable fetch wrapper that ensures cookies are sent/received via `credentials: 'include'`.
- **`services/auth-service.ts`**: Service layer containing `login`, `register`, `getCurrentUser` (calls `/users/me`), and `logout`.
- **`components/auth/auth-form.tsx`**: Unified form for Login and Registration. Does not use `localStorage` for session data. Uses `sonner` toast notifications to provide immediate, user-friendly feedback on login/registration success or failure.
