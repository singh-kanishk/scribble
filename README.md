# Scribble Monorepo

This repository contains a full-stack application built using a Turborepo monorepo structure. It includes the following packages:

- **backend**: Node/TypeScript server with Drizzle ORM, Express/Koa (or similar) routes, authentication, and database setup.
- **client**: Frontend application built with Vite and React/TypeScript.
- **shared**: Shared utilities and types used by both backend and client.

## Getting Started

### Prerequisites

- Node.js 18+ (or latest LTS)
- pnpm package manager
- Docker (optional, for running services via `docker-compose`)

### Install dependencies

```bash
pnpm install
```

### Development

Start the development environment using Turbo:

```bash
pnpm dev
```

This will run both the backend and client concurrently (see `package.json` scripts).

### Building

```bash
pnpm build
```

### Running with Docker

The repository includes a `docker-compose.yaml` that can start the backend server and a PostgreSQL database container. It’s useful for getting a local database without installing Postgres manually.

1. **Create environment file**
   - Copy the example or create a `.env` at the repo root (or under `packages/backend`) with values such as:
     ```ini
     DATABASE_URL=postgres://user:password@localhost:5433/scribble
     JWT_SECRET=your_secret_here
     ```
   - `docker-compose` uses `DATABASE_URL` to configure the db container.

2. **Start the services**

```bash
docker-compose up --build
```

   - The PostgreSQL container listens on `localhost:5433` by default.
   - Backend migrations (if any) can be applied by running the appropriate script from `packages/backend` after the container is up. For example:
     ```bash
     pnpm --filter backend run migrate
     ```

3. **Stopping and cleaning**

```bash
docker-compose down --volumes
```

   - Use `--volumes` to wipe the database state when you want a fresh start.

This setup allows you to develop against a real database without external dependencies.

### Workspace Structure

```text
packages/
  backend/      # server code, database config
  client/       # React application
  shared/       # shared code, types, utilities
```

### Contributing

Feel free to open issues or submit PRs. Follow the coding standards and run lints/tests before pushing changes.

### License

Specify license here (e.g. MIT).
