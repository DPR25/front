FROM node:12-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY dist /app/dist

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]