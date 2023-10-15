# Build the React app
FROM node:16.19.0 as build
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Build the NestJS server
FROM node:16.19.0

WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/ ./
COPY --from=build /app/build ./public
RUN npm run build
RUN echo "test change"

EXPOSE 3000

CMD ["npm", "start"]
