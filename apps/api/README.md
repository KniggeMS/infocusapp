# InfocusApp API

This is the backend API for the InfocusApp, built with Express.js.

## Railway Deployment

Use the following settings in your Railway service to deploy this API successfully. This configuration solves a common, tricky issue with Prisma, PNPM workspaces, and build environments like Railway.

### Build Settings

- **Builder:** `Railpack` / `Nixpacks`
- **Build Command:** `pnpm run build --filter api`

**Explanation:**
This command uses PNPM's native workspace filtering to run the `build` script (`tsc`) specifically for the `api` package. It avoids using `turbo` for the build step, which can cause path resolution issues with Prisma in some containerized environments.

### Start Settings

- **Start Command:** `pnpm start`

**Explanation:**
This command executes the `start` script defined in the root `package.json`, which is `pnpm --filter api start`. This, in turn, runs the `start` script within the `api` package: `prisma migrate deploy && node dist/index.js`. It ensures migrations are applied before the application starts.

### The `postinstall` Hook

The key to this setup is the `postinstall` script in the root `package.json`:
```json
"postinstall": "pnpm --filter @repo/db generate"
```
This script runs automatically after `pnpm install`. It generates the Prisma client *before* the build process begins, ensuring the client is available when `tsc` compiles the code. This prevents the `"path" argument must be of type string` error during the build.

**Important:** Ensure the `Root Directory` setting in Railway is **empty** to run commands from the project root.
