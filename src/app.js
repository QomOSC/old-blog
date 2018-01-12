import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import mongoose from 'mongoose';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser';
import path from 'path';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';
import helmet from 'helmet';

import config from './config.json';
import replies from './replies';
import UserManager from './utils/UserManager';

/**
 * setting global rootRequire and import some stuff
 */

global.rootRequire = name => require(path.resolve(__dirname, name));
const routers = require('./routers');

/**
 * setting up db
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
 useMongoClient: true,
});

const app = express();

let server;

server = app.listen(config.port, () => {
    console.log(`Server has been started on port ${config.port}`);
});

/**
 * Helmet
 */
app.use(helmet());

/**
 * static files
 */
app.use('/files', express.static(path.resolve(__dirname, './public')));

/**
 * logger
 */
app.use(morgan('short'));

/**
 * request parser
 */
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
  secret: 'QIFu{W\'(![m#k5xVfL%dwGAADGDE564%?sKb]JTqeN0Uz.9vH4ahjM1l~',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24
  },
  store: new MongoStore({
    host: '127.0.0.1',
      port: '27017',
      url: config.db
  })
}));

/**
 * setting up flash
 */
app.use(flash());

/**
 * nunjucks
 */
app.set('engine', nunjucks.configure(path.resolve(__dirname, './views'), {
  express: app
}));

/**
 * add default variable to templates
 * and add locals and tagCreator to res
 */

function addTag(name, attribute) {
  let att = [];

  for (let [key, value] of Object.entries(attribute)) {
    att.push(`${key}="${value}"`);
  }

  return `<${name} ${att.join(' ')}>`;
}

app.use((req, res, next) => {
  res.localSource = {
    header: [],
    footer: [],
    path: path.resolve(__dirname, 'views', 'layouts'),
    report: JSON.stringify(req.flash('report') || [])
  };

  app.get('engine').addGlobal('locals', res.localSource);

  res.locals.header = (name, att) => {
    res.localSource.header.push(addTag(name, att));
  };
  res.locals.footer = (name, att) => {
    res.localSource.footer.push(addTag(name, att));
  };

  next();
});

/**
 * add reply to res
 */

app.use((req, res, next) => {
  res.reply = {};
  res.reply.ok = replies.ok.bind(null, res);
  res.reply.notFound = replies.notFound.bind(null, res);
  res.reply.forbidden = replies.forbidden.bind(null, res);
  res.reply.error = replies.error.bind(null, res);

  next();
});

/**
 * add LoginManager
 */

function* getUserDoc(users) {
  for (let user of users) {
    yield user.load();
  }
}

app.use((req, res, next) => {
  req.member = new UserManager('member', req.session, 'Member');

  let iterator = getUserDoc([req.member]);
  (function loop() {
    let go = iterator.next();

    if (go.done) {
      next();
    } else {
      go.value.then(loop);
    }
  })();
});

app.use((req, res, next) => {
  req.middle = {};

  next();
});

/**
 * routers
 */

for (let router of routers) {
  app.use(router);
}

app.use((req, res) => {
   res.reply.notFound();
});
