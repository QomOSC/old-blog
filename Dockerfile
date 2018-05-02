FROM node:8.9

COPY package.json package-lock.json /app/

WORKDIR /app/

RUN npm install

COPY . /app/

RUN npm run prod

CMD node build/app.js

EXPOSE 8080