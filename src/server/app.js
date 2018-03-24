import 'babel-polyfill';
import express from 'express';
import { join } from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import process from 'process';

import config from './config';

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

app.use((req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

app.listen(config.port, 'localhost', () => {
  console.log('The server is running!');
});
