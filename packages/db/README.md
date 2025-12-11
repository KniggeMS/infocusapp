# DB

This package contains the Prisma schema and client for the InfocusApp application.

## Schema

The database schema is defined in `prisma/schema.prisma`. To apply any changes to the database schema, you can run the following command from the root of the monorepo:

```bash
pnpm db:push
```

## Client

The Prisma client is generated automatically when you install the dependencies. You can import the client in your code like this:

```typescript
import { PrismaClient } from "@repo/db";

const prisma = new PrismaClient();
```
