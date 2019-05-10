/* eslint-disable no-console */

/**
 * This file is only used to deploy the apis need for abt wallet qrcode scanning to work
 */
const morgan = require('morgan');
const express = require('express');
const serverless = require('serverless-http');
// const mongoose = require('mongoose');

console.log('env', JSON.stringify(process.env));

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create and config express application
const server = express();

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

server.get('/.netlify/functions/express/hello', (req, res) => {
  res.send('hello world');
});

// Make it serverless
exports.handler = serverless(server);
