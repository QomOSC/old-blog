import 'babel-polyfill';
import spdy from 'spdy';
import { join } from 'path';
import { createServer } from 'http';
import morgan from 'morgan';
import express from 'express';
import process from 'process';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
import session from 'express-session';
import graphql from 'express-graphql';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';

import config from './config';
import schema from './graphql';
import routers from './routers';

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

mongoose.connection.on('error', () => {
  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  process.exit(0);
});

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

if (process.env.NODE_ENV !== 'development') {
  createServer((req, res) => {
      res.writeHead(301, { Location: `${config.url}${req.url}` });
      res.end();
  }).listen(80);
}

app.use('/static', express.static(join(__dirname, './static')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: 100000000 }));

/**
 * cookie parser
 */
app.use(cookieParser());

/**
 * session
 */
let MongoStore = connectMongo(session);

app.use(session({
  secret: process.env.SECRET_KEY || 'QIFE564%?sKb]JTqeN0Uz.9vH4ahjM1l~',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24
  },
  store: new MongoStore({
    url: process.env.DB || config.db
  })
}));

for (const router of routers) {
  app.use(router);
}

app.use('/graphql', (req, res) =>
  graphql({
    schema,
    graphiql: true,
    context: { req, res }
  })(req, res)
);

app.use((req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

if (process.env.NODE_ENV === 'development') {
  app.listen(config.port, config.origin, () => {
    console.log(`The server is running on port ${config.port}`);
  });
} else {
  spdy.createServer({
    cert: readFileSync(join(__dirname, 'ssl/f.pem')),
    key: readFileSync(join(__dirname, 'ssl/p.pem'))
  }, app).listen(443);
}
