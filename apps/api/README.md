# InfocusApp API

This is the backend API for the InfocusApp, built with Express.js.

## Railway Deployment

Use the following settings in your Railway service to deploy this API successfully.

### Build Settings

- **Builder:** `Nixpacks` (or `Railpack`)
- **Build Command:** `npx turbo run build --force`

**Explanation:**
This command tells Turborepo to run the `build` script (which is `tsc`) in all packages, ignoring any cache (`--force`) to ensure a fresh, reliable build. This will create a `dist` folder inside `apps/api` containing the compiled JavaScript.

### Start Settings

- **Start Command:** `node apps/api/dist/index.js`

**Explanation:**
This command directly executes the compiled entry point of your application. The `pnpm install` at the beginning of the deployment process makes all dependencies available to this script.

**Important:** Ensure the `Root Directory` setting is **empty** to run commands from the project root.
