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

const dev = process.env.NODE_ENV !== 'production';
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
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

const router = express.Router();

router.get('/hello', (req, res) => {
  res.send('hello world');
});

// eslint-disable-next-line global-require
require('../routes')(router);

server.use(dev ? '/' : '/.netlify/functions/', router);

// Make it serverless
exports.handler = serverless(server);
