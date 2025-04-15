FROM node:20-alpine

WORKDIR /app
ADD https://www.google.com /time.now
COPY package.json .

RUN npm install

COPY dist /app/dist

EXPOSE 3000

CMD [ "npm", "run", "preview"  ]