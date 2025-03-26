# Web Application

A modern, type-safe web application built with [TanStack Start](https://tanstack.com/start/latest) and React.

## ✨ Features

- 🚀 [TanStack Start](https://tanstack.com/start/latest) for modern React development
- 🛣️ Type-safe routing with [@tanstack/react-router](https://tanstack.com/router)
- 🔍 Data fetching with [@tanstack/react-query](https://tanstack.com/query)
- 🎨 Styling with [Tailwind CSS](https://tailwindcss.com/)
- 🎯 Full TypeScript support
- 📱 Responsive design with modern UI components
- 🔄 Auto-generated type-safe API client integration

## 📁 Project Structure

```
app/
├── client.tsx       # Client entry point
├── ssr.tsx         # Server-side rendering entry point
├── router.tsx      # Router configuration
├── components/     # Reusable UI components
├── features/       # Feature-specific components and logic
├── routes/         # Route components and layouts
├── layout/         # Layout components
├── lib/           # Shared libraries
├── utils/         # Utility functions
├── styles/        # Global styles and Tailwind config
└── config/        # Application configuration
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

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm type-check` - Run TypeScript type checking

## 🔄 API Integration

The application uses a type-safe API client generated from the API service:

```typescript
import { apiClient } from '@monorepo-starter/api/client'

// Type-safe API calls with full autocompletion
const { data } = await apiClient.users.get()
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration can be found in:

- `app/styles/tailwind.css` - Global styles
