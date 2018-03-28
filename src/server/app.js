import 'babel-polyfill';
import { join } from 'path';
import morgan from 'morgan';
import express from 'express';
import process from 'process';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';

import config from './config';

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
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1000 * 24
  },
  store: new MongoStore({
    url: process.env.DB || config.db
  })
}));

for (const router of routers) {
  app.use(router);
}

app.use((req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

app.listen(config.port, 'localhost', () => {
  console.log('The server is running!');
});
