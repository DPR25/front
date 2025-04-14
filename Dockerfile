FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM socialengine/nginx-spa:latest
COPY --from=builder /app/dist /app
RUN chmod -R 777 /app