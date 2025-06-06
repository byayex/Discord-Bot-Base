FROM node:22-alpine AS build

WORKDIR /usr/src

COPY ./package*.json ./

# We cant use --production here because we are building typescript in the container
RUN npm install

COPY ./ ./

FROM node:22-alpine

WORKDIR /usr/src

COPY --from=build /usr/src ./

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENTRYPOINT ["npm", "run", "start"]
