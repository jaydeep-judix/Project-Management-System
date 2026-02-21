# User Authentication Feature

### Purpose

This feature handles everything related to user access specifically registration and secure login. It ensures that only registered people can access protected parts of the system and that their sensitive data is handled safely.

### Public APIs

- **POST `/users/register`**
  - **Payload**: `name`, `email`, `password`.
  - **Details**: Creates a new user account.
  - **Validation**: Ensures the email isn't already taken and that the input matches the required schema.

- **POST `/users/login`**
  - **Payload**: `email`, `password`.
  - **Details**: Checks credentials and hands out a JWT access token if they match.

### Business Rules

- **Unique Emails**: You can't sign up twice with the same email. The system will throw an `EMAIL_ALREADY_EXISTS` error if you try.
- **Secure Passwords**: We never store plain text passwords. Everything is hashed with bcrypt before hitting the database.
- **Session Security**: Login provides a JWT token that lasts for 1 hour. This token must be used for any authenticated requests.
- **Standardized Responses**: All errors follows a consistent format (success: false, error code, etc.) so the frontend can easily handle specific edge cases like duplicate emails.
