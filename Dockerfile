FROM node:8.9

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

COPY package.json yarn.lock /app/

WORKDIR /app/

RUN yarn install --pure-lockfile

COPY . /app/

RUN npm run build

RUN mkdir uploads

CMD npm run app

EXPOSE 8010