# InfocusApp - Your Personal Media Watchlist

[![Status](https://img.shields.io/badge/status-in_development-green)](https://github.com/KniggeMS/infocusapp)
[![GitHub Issues](https://img.shields.io/github/issues/KniggeMS/infocusapp)](https://github.com/KniggeMS/infocusapp/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/KniggeMS/infocusapp)](https://github.com/KniggeMS/infocusapp/pulls)

InfocusApp is a modern, all-in-one application to track your movies and TV shows. Keep a watchlist, manage your collections, and get personalized recommendations.

## ✨ Features

- **Unified Watchlist**: Manage items you plan to watch, are currently watching, or have already seen.
- **Personal Collections**: Create custom lists for any occasion (e.g., "Movie Night Picks", "Oscar Winners").
- **Smart Search**: Quickly find any movie or series from The Movie Database (TMDB).
- **AI-Powered Recommendations**: Get suggestions based on your unique taste.
- **Multi-language Support**: Available in English and German.
- **Cross-Platform**: Web, API, and a mobile app.

## 🚀 Getting Started

This project is a monorepo managed with `pnpm` and `Turborepo`.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/) (for database)

### Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KniggeMS/infocusapp.git
    cd infocusapp
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary variables. You can use the `.env.example` as a template.
    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cinelog"
    TMDB_API_KEY="your_tmdb_api_key"
    ```

4.  **Start the database:**
    ```bash
    docker-compose up -d
    ```

5.  **Run database migrations:**
    ```bash
    pnpm db:push
    ```

6.  **Run the development environment:**
    This command will start the Next.js web app, the Express API and the React Native app concurrently.
    ```bash
    pnpm dev
    ```

##  Monorepo Structure

This monorepo contains the following apps and packages:

### Apps

- `apps/api`: The Express.js backend API.
- `apps/web`: The Next.js web application.
- `apps/mobile`: The React Native mobile application.

### Packages

- `packages/db`: Shared database schema and client using Prisma.
- `packages/ui`: Shared React component library.
- `packages/types`: Shared TypeScript type definitions.
- `packages/eslint-config-custom`: Shared ESLint configuration.
- `packages/tsconfig-custom`: Shared TypeScript configuration.

Each app and package has its own `README.md` file with more detailed information.

## 🛠️ Tech Stack

- **Monorepo**: [pnpm](https://pnpm.io/), [Turborepo](https://turbo.build/)
- **Frontend (`apps/web`)**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend (`apps/api`)**: [Express](https.expressjs.com/), [Prisma](https://www.prisma.io/)
- **Mobile (`apps/mobile`)**: [React Native](https://reactnative.dev/), [Expo](https://expo.dev/)
- **Database (`packages/db`)**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **UI (`packages/ui`)**: Shared React components
- **Deployment**: [Vercel](https://vercel.com/) (Frontend), [Railway](https://railway.app/) (Backend)

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

*This README was last updated by your AI coding assistant.*
