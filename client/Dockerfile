# Install dependencies only when needed
FROM node:24.2-bullseye-slim AS deps

RUN apt update && apt install --yes --no-install-recommends curl default-jre

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:24.2-slim AS builder
WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

# Build the Next.js app
RUN npm run build

# Production image
FROM node:24.2-alpine3.21 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only essential files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
