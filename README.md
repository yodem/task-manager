# Task Manager Application

A full-stack task management application built with React and NestJS.

## Project Structure

```
task-manager/
├── frontend/    # React application with Vite
└── backend/     # NestJS API server
```

## Getting Started

1. Clone the repository
2. Set up the backend:

```bash
cd backend
pnpm install
pnpm run start:dev
```

3. Set up the frontend:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3001
- Backend: http://localhost:3000

## Tech Stack

### Frontend

- React 19
- Vite 6
- TanStack Router
- TanStack Query
- TypeScript

### Backend

- NestJS
- TypeScript
- PostgreSQL (coming soon)

## Development

Both frontend and backend support hot-reload during development. Use the following commands in their respective directories:

Frontend:

```bash
npm run dev
```

Backend:

```bash
pnpm run start:dev
```

## License

MIT
