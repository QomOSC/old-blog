# QOM Open Source Community Blog


## Run

`git clone https://github.com/qomosc/blog.git`

`cd blog`

`npm install`

### Development

`npm run dev`

`npm run linux-server` or `npm run windows-server`

open http://localhost:8080

### Deploying with PM2

`npm run prod`

`pm2 build/app.js`

**NOTE:** Don't forget to change configurations in
`src/server/config.js`

### Deploying with Docker

Run `cp .env.example .env` and change configurations in `.env`. We will use `SECRET_KEY` to secure sessions and sensetive data.

You can then run using Docker Compose:

```
docker-compose up -d
```