/* eslint-disable no-console */

/**
 * This file is only used to deploy the apis need for abt wallet qrcode scanning to work
 */
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

console.log('env', JSON.stringify(process.env));

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create and config express application
const server = express();
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use(
  morgan((tokens, req, res) => {
    const log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');

    if (process.env.NODE_ENV !== 'dev') {
      // Log only in AWS context to get back function logs
      console.log(log);
    }
    return log;
  })
);

server.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

server.use((req, res) => {
  res.json({
    url: req.url,
    headers: req.headers,
    query: req.query,
  });
});

server.get('/hello', (req, res) => {
  res.send('hello world');
});

const router = express.Router();

// eslint-disable-next-line global-require
require('../routes')(router);

router.get('/api/routes', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  res.json(router._router.stack.filter(r => r.route).map(r => r.route.path));
});

// CUATION: be sure to change this if file renamed
server.use('/.netlify/functions/app/', router);

// Make it serverless
exports.handler = serverless(server);
