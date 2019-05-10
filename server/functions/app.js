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

console.log('env', process.env);

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create and config express application
const server = express();
server.use(cookieParser());
server.use(bodyParser());
server.use(cors());
server.use(morgan(dev ? 'tiny' : 'combined'));
server.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// eslint-disable-next-line global-require
// require('../routes')(server);
server.get('*', (req, res) => res.json({ status: 200, message: 'I am ok' }));

// Make it serverless
exports.handler = serverless(server);
