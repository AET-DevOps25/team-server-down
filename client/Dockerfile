FROM node:24.2-bullseye-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG API_URL
ARG GENAI_API_URL
ENV NEXT_PUBLIC_GENAI_URL=${GENAI_API_URL}
ENV NEXT_PUBLIC_API_URL=${API_URL}

RUN npm run build

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Remove the existing node_modules directory and only install production dependencies
RUN npm ci --only=production && npm cache clean --force

FROM node:24.2-alpine3.21 AS production

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

CMD ["npm", "start"]