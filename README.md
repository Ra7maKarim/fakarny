# MySafe backend

MySafe is a personal document management and reminder system. The project currently has the Express and TypeScript foundation plus **Phase 2 database setup**: PostgreSQL configuration, TypeORM entities, and the first migration. Authentication, domain APIs, uploads, reminders, and API documentation are added in later phases.

Application code is TypeScript under `src/`. TypeScript keeps `.js` in relative import specifiers because Node runs the compiled JavaScript in `dist/`; the TypeScript compiler resolves these specifiers to the source `.ts` files and writes matching `.js` files to `dist/`.

Feature folders are organized under `src/modules/`. Their directories are present for the agreed architecture, but feature code will be added in its own phase.

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL

## Setup

```sh
npm install
Copy-Item .env.example .env # PowerShell
```

The `.env` file is local configuration and should never be committed. Set `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME` to match a PostgreSQL role and database you created. `PORT` defaults to `3000` if omitted.

Apply the schema migration before starting the server:

```sh
npm run db:migrate
```

The migration creates the `pgcrypto` extension for UUID generation. The connected database role needs permission to create that extension if it is not already present.

## Run

Development with automatic restart:

```sh
npm run dev
```

Build and run the compiled server:

```sh
npm run build
npm start
```

To undo the latest migration, run `npm run db:revert`.

The health check is available at `GET http://localhost:3000/health` and returns `{"status":"ok"}`.

## Checks

```sh
npm run typecheck
npm run build
npm test
```

The initial migration enforces reminder target exclusivity and cross-user ownership consistency with database constraints. Notification occurrences are unique per reminder and scheduled timestamp, so rerunning a future scheduler cannot insert the same occurrence twice. TypeORM schema synchronization is disabled; schema changes go through migrations.
