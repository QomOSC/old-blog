# QOM Open Source Community Blog


## Run

`git clone https://github.com/qomosc/blog.git`

`cd blog`

`npm install`

### Development

`npm run dev`

`npm run linux-server` or `npm run windows-server`

open http://localhost:8080

### Production

`npm run prod`
`pm2 build/app.js`

**NOTE:** you need to have a TLS certificate in order to run the project in
production mode, you have to put certificate files in `src/server/ssl` with
names `p.pem` and `f.pem`. Don't forget to change configurations in
`src/server/config.js`
