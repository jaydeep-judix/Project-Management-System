# Authentication Setup

## Architecture

The system uses a secure cookie-based authentication flow:

1.  **Login/Register**: User submits credentials via the `AuthForm`.
2.  **Server Response**: On success, the server generates a JWT and sets it in an **HttpOnly, Secure (in production)** cookie named `token`.
3.  **Automatic Persistence**: Browsers automatically include this cookie in subsequent requests to the same domain.
4.  **Client-side Access**: The frontend does not need to (and cannot) read the cookie directly, protecting it from XSS. The `apiClient` uses `credentials: 'include'` to handle this.

## Components

### Backend (Express)

- **`src/app.ts`**: Configured with `cookie-parser` and CORS to allow credentials from `FRONTEND URL`.
- **`src/features/users/users.controller.ts`**: Handles the `login` logic specifically to attach the cookie to the response.


### Frontend (Next.js)

- **`lib/api-client.ts`**: Reusable fetch wrapper that ensures cookies are sent/received via `credentials: 'include'`.
- **`services/auth-service.ts`**: Service layer for interacting with `/users/login` and `/users/register`.
- **`components/auth/auth-form.tsx`**: Unified form for Login and Registration with independent `handleLogin` and `handleRegister` functions.

