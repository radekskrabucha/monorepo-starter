ARG NODE_VERSION=22.14.0

# Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Setup pnpm and turbo on the alpine base
FROM alpine AS base

RUN npm install -g pnpm@latest turbo@latest
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects
FROM base AS pruner
ARG PROJECT=@monorepo-starter/api

USER nodejs

WORKDIR /app
COPY --chown=nodejs:nodejs . .
RUN TURBO_TELEMETRY_DISABLED=1 turbo prune --scope=${PROJECT} --docker

# Build the project
FROM base AS builder
ARG PROJECT=@monorepo-starter/api

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --chown=nodejs:nodejs --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --chown=nodejs:nodejs --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --chown=nodejs:nodejs --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --chown=nodejs:nodejs --from=pruner /app/out/full/ .

RUN TURBO_TELEMETRY_DISABLED=1 turbo build --filter=${PROJECT} --no-daemon
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# Final image
FROM alpine AS runner
ARG PROJECT_FOLDER_NAME=api

WORKDIR /app
COPY --chown=nodejs:nodejs --from=builder /app .
WORKDIR /app/apps/${PROJECT_FOLDER_NAME}

ARG PORT=4000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

ARG LOG_LEVEL=debug
ARG TRUSTED_ORIGINS=
ARG DATABASE_URL=

ENV LOG_LEVEL=${LOG_LEVEL}
ENV TRUSTED_ORIGINS=${TRUSTED_ORIGINS}
ENV DATABASE_URL=${DATABASE_URL}

CMD ["node", "dist/index"]