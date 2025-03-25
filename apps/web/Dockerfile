ARG NODE_VERSION=22.14.0

# Alpine image
FROM node:${NODE_VERSION}-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat

# Setup pnpm and turbo on the alpine base
FROM alpine AS base
RUN npm install pnpm turbo --global
RUN pnpm config set store-dir ~/.pnpm-store

# Prune projects
FROM base AS pruner
ARG PROJECT=@monorepo-starter/web

WORKDIR /app
COPY . .
RUN TURBO_TELEMETRY_DISABLED=1 turbo prune --scope=${PROJECT} --docker

# Build the project
FROM base AS builder
ARG PROJECT=@monorepo-starter/web

WORKDIR /app

# Copy lockfile and package.json's of isolated subworkspace
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install the dependencies (as they change less often)
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy source code of isolated subworkspace
COPY --from=pruner /app/out/full/ .

ARG VITE_IS_DEV=false
ARG VITE_API_URL=http://localhost:4000

ENV VITE_IS_DEV=${VITE_IS_DEV}
ENV VITE_API_URL=${VITE_API_URL}


RUN TURBO_TELEMETRY_DISABLED=1 turbo build --filter=${PROJECT} --no-daemon
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# Final image
FROM alpine AS runner
ARG PROJECT=@monorepo-starter/web
ARG USER=nodejs

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ${USER}
USER ${USER}

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/apps/${PROJECT}

ARG PORT=3000
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

ARG VITE_IS_DEV=false
ARG VITE_API_URL=http://localhost:4000

ENV VITE_IS_DEV=${VITE_IS_DEV}
ENV VITE_API_URL=${VITE_API_URL}

CMD node dist/index