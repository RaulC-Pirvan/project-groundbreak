# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS deps
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Build-only defaults so next.config runtime env validation succeeds during image build.
ARG APP_ENV=prod
ARG DATABASE_URL=postgresql://groundbreak:build_only@localhost:5432/groundbreak_build?schema=public
ENV APP_ENV=${APP_ENV}
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY next.config.ts tsconfig.json next-env.d.ts ./
COPY prisma.config.ts ./prisma.config.ts
COPY src ./src
COPY public ./public
COPY prisma ./prisma
COPY scripts/validate-runtime-env.mjs ./scripts/validate-runtime-env.mjs

RUN npx prisma generate
RUN npm run build
RUN rm -rf .next/cache

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/scripts/validate-runtime-env.mjs ./scripts/validate-runtime-env.mjs

USER nextjs

EXPOSE 3000

CMD ["sh", "-c", "node scripts/validate-runtime-env.mjs && node server.js"]
