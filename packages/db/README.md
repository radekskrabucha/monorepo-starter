# Database Package

A type-safe database layer built with [Drizzle ORM](https://orm.drizzle.team/) and PostgreSQL.

## ✨ Features

- 🚀 [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- 📊 PostgreSQL database connection
- 🔒 Type-safe schema definitions
- 🔄 Automatic Zod schema generation
- 🛠️ Migration management with Drizzle Kit
- 📝 Type-safe query builder

## 📁 Project Structure

```
src/
├── index.ts        # Main entry point and exports
├── schema/        # Database schema definitions
├── zod-schema/    # Generated Zod schemas
├── migrations/    # Database migrations
└── utils/         # Utility functions
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

Required variables:

- `DATABASE_URL`: PostgreSQL connection string

## 📝 Available Scripts

- `pnpm build` - Build the package
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm type-check` - Run TypeScript type checking
- `pnpm db:migrate` - Run database migrations
- `pnpm db:generate-migration` - Generate new migration

## 🔄 Usage

### Schema Definition

```typescript
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow()
})
```

## 🗄️ Migrations

1. Make changes to your schema files in `src/schema/`

2. Generate a new migration:

```bash
pnpm db:generate-migration
```

3. Apply migrations:

```bash
pnpm db:migrate
```
