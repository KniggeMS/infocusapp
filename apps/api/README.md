# API

This is the backend API for the InfocusApp application. It is built with Express.js and uses Prisma for database access.

## Getting Started

To get started with the API, you first need to install the dependencies:

```bash
pnpm install
```

Then, you can run the development server:

```bash
pnpm dev
```

This will start the server on `http://localhost:3001`.

## Database

The database schema is defined in `packages/db/prisma/schema.prisma`. To apply any changes to the database schema, you can run the following command:

```bash
pnpm db:push
```