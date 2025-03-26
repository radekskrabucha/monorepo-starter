# Monorepo Starter

A modern, full-stack monorepo starter template using cutting-edge technologies and best practices.

## 🚀 Features

- 📦 Monorepo structure using [PNPM Workspaces](https://pnpm.io/workspaces)
- ⚡️ [Turborepo](https://turbo.build/) for build system and task running
- 🔄 Modern React setup with [TanStack Start](https://tanstack.com/start/latest)
- 🔍 Data fetching with [@tanstack/react-query](https://tanstack.com/query)
- 🎨 Styling with [Tailwind CSS](https://tailwindcss.com/)
- 🎯 [TypeScript](https://www.typescriptlang.org/) for type safety
- 🌐 [Hono](https://hono.dev/) for backend API with Hono Client for type-safe HTTP requests
- 📊 [Drizzle ORM](https://orm.drizzle.team/) for database operations
- 🧪 Testing with [Vitest](https://vitest.dev/)
- 📝 Linting with [ESLint](https://eslint.org/) and formatting with [Prettier](https://prettier.io/)

## 📁 Project Structure

```
.
├── apps/
│   ├── api/          # Backend API application
│   └── web/          # Frontend web application
├── packages/
│   ├── browser-utils/  # Browser-specific utilities
│   ├── db/            # Database configurations and schemas
│   ├── eslint/        # Shared ESLint configurations
│   ├── ui/            # Shared UI components
│   └── utils/         # Common utilities
└── package.json      # Root package.json
```

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/)
- [PNPM](https://pnpm.io/)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/monorepo-starter.git
cd monorepo-starter
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development servers:
```bash
pnpm dev
```

## 🔐 Environment Variables

Each application has its own environment variables. Copy the example environment files and update them with your values:

### API Application (`apps/api`)

```bash
cp apps/api/.env.example apps/api/.env
```

### Web Application (`apps/web`)

```bash
cp apps/web/.env.example apps/web/.env
```

## 🐳 Docker Deployment

The project includes Docker support for easy deployment with Docker Compose. The setup includes:

- PostgreSQL database
- Redis cache
- API service
- Web frontend
- Health checks for all services
- Automatic container restart
- Separate networks for frontend and backend
- Volume persistence for databases

### Running with Docker Compose

1. Build and start all services:
```bash
docker compose up -d
```

2. View logs:
```bash
docker compose logs -f
```

3. Stop all services:
```bash
docker compose down
```

4. Stop and remove volumes:
```bash
docker compose down -v
```
## 📝 Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications and packages
- `pnpm start` - Start all applications in production mode
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run tests

## 🏗️ Adding New Apps or Packages

1. Create a new directory in `apps/` or `packages/`
2. Add a `package.json` with the appropriate name and dependencies
3. Run `pnpm install` to update dependencies
