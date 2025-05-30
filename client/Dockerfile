# Install dependencies only when needed
FROM node:18-alpine AS deps

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:20-slim AS builder
WORKDIR /app

COPY . .

COPY --from=deps /app/node_modules ./node_modules

# Build the Next.js app
RUN npm run build

# Production image
FROM node:20-alpine AS runner

ENV NODE_ENV=production

# Copy only essential files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
