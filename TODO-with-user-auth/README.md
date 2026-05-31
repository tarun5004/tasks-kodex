# Notes API with User Auth

Small Express + MongoDB practice project for learning auth-protected CRUD.

Users can register, log in, get a JWT token, and use that token to create and manage their own notes. Notes are saved with an `owner` field, so one user's notes stay separate from another user's notes.

## Tech Used

- Node.js
- Express
- MongoDB + Mongoose
- JWT for auth
- bcryptjs for password hashing
- dotenv for environment variables

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

Expected terminal output:

```text
Connected to MongoDB
Server is running on port 3000
```

## Project Structure

```text
src/
  config/          MongoDB connection
  controller/      Handles request and response
  middleware/      Auth, error, and not-found middleware
  models/          Mongoose schemas
  routes/          API route definitions
  service/         Database/business logic
  utils/           ApiError, ApiResponse, asyncHandler
  validation/      Request body validation
```

Basic flow:

```text
route -> validation/protect middleware -> controller -> service -> model
```

## Auth Routes

Base URL:

```text
http://localhost:3000
```

### Register

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Tarun",
  "email": "tarun@example.com",
  "password": "123456"
}
```

### Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "tarun@example.com",
  "password": "123456"
}
```

Login returns a token. Use it for notes routes:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

## Notes Routes

All notes routes are protected. Send the JWT token in the `Authorization` header.

### Create Note

```http
POST /api/notes/add
```

Body:

```json
{
  "title": "Learn auth",
  "content": "Token se user milega, user se note owner save hoga"
}
```

### Get My Notes

```http
GET /api/notes
```

Returns only notes owned by the logged-in user.

### Get One Note

```http
GET /api/notes/:id
```

Example:

```http
GET /api/notes/665f1a2b3c4d5e6f78901234
```

### Update Note

```http
PATCH /api/notes/:id
```

Body:

```json
{
  "title": "Updated title",
  "content": "Updated note content"
}
```

### Delete Note

```http
DELETE /api/notes/:id
```

## Important Logic

When a note is created, the API does not trust the client to send the user id.

The auth middleware reads the token, finds the user, and puts the user on:

```js
req.user
```

Then the note is created with:

```js
owner: req.user._id
```

That is the main connection between user and notes.

## Postman Test Order

1. Register a user.
2. Login with the same email and password.
3. Copy the token from login response.
4. Add this header to notes requests:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

5. Create, list, update, and delete notes.

## Common Issues

If Postman does not hit your latest server code, stop old Node processes and restart:

```bash
npm run dev
```

If protected routes return `Access token is required`, check the header format:

```text
Authorization: Bearer token_here
```

If MongoDB does not connect, check `MONGO_URI` in `.env`.
