# tasks-kodex

Backend practice projects built while learning Express, MongoDB, authentication, and clean API structure.

The main project right now is:

```text
TODO-with-user-auth/
```

It is a notes API with user registration, login, JWT auth, and protected notes CRUD.

## Projects

### TODO-with-user-auth

Auth-protected notes API.

Features:

- Register user
- Login user
- Generate JWT token
- Hash passwords with bcryptjs
- Create notes for logged-in user
- Get logged-in user's notes
- Get one note by id
- Update own note
- Delete own note
- Global error handling
- Async handler wrapper
- Service/controller/route separation

Main routes:

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/notes/add
GET    /api/notes
GET    /api/notes/:id
PATCH  /api/notes/:id
DELETE /api/notes/:id
```

Protected notes routes need this header:

```text
Authorization: Bearer YOUR_TOKEN
```

### TODO-with-Auth

Earlier Todo API practice attempts. This folder has the first Todo CRUD/auth practice code and experiments.

## Run the Current Project

Go to the notes auth project:

```bash
cd TODO-with-user-auth
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start development server:

```bash
npm run dev
```

Expected output:

```text
Connected to MongoDB
Server is running on port 3000
```

## Postman Flow

1. Register a user.
2. Login with that user.
3. Copy the token from login response.
4. Use the token in notes routes:

```text
Authorization: Bearer YOUR_TOKEN
```

5. Create, read, update, and delete notes.

## Folder Style

The current project follows this backend structure:

```text
src/
  config/
  controller/
  middleware/
  models/
  routes/
  service/
  utils/
  validation/
```

Request flow:

```text
route -> validation/auth middleware -> controller -> service -> model
```

The main learning goal is to keep each layer simple:

- routes define URLs
- validation checks request data
- middleware handles auth/errors
- controllers handle request and response
- services handle database logic
- models define MongoDB schema
