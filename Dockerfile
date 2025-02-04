FROM node:20-alpine AS build

WORKDIR /usr/src

COPY src/ ./

RUN npm install

RUN npm prune --production

FROM node:20-alpine

WORKDIR /usr/src

COPY --from=build /usr/src ./

CMD ["npx", "ts-node", "index.ts"]
