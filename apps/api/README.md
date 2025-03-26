# API Application

A modern, type-safe API built with [Hono](https://hono.dev/) and TypeScript.

## ✨ Features

- 🚀 High-performance [Hono](https://hono.dev/) server
- 🔒 Type-safe API routes with [Zod](https://zod.dev/) validation
- 📊 [Drizzle ORM](https://orm.drizzle.team/) for database operations
- 🔄 Auto-generated type-safe API client
- 📝 Request logging with [Pino](https://getpino.io/)
- 🧪 Testing with [Vitest](https://vitest.dev/)

## 📁 Project Structure

```
src/
├── index.ts         # Application entry point
├── routes/          # API route handlers
├── lib/            # Shared libraries and client generation
├── middleware/     # Hono middleware
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🚀 Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:4000`

## 📝 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run tests

## 🔄 API Client

The API automatically generates a type-safe client that can be imported in other applications:

```typescript
import { apiClient } from '@monorepo-starter/api/client'

// Type-safe API calls
const data = await apiClient.users.get()
```
