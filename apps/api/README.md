# InfocusApp API

This is the backend API for the InfocusApp, built with Express.js.

## Railway Deployment

Use the following settings in your Railway service to deploy this API successfully.

### Build Settings

- **Builder:** `Nixpacks` (oder `Railpack`)
- **Build Command:** `npx turbo run build && pnpm --filter api deploy api-deploy`

### Start Settings

- **Start Command:** `node api-deploy/index.js`

**Important:** Ensure the `Root Directory` setting is **empty** to run commands from the project root.
