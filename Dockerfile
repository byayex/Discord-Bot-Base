FROM node:20-alpine AS build

WORKDIR /usr/src

COPY src/package*.json ./

RUN npm install --production

COPY src/ ./

FROM node:20-alpine

WORKDIR /usr/src

COPY --from=build /usr/src ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENTRYPOINT ["npx", "ts-node", "index.ts"]