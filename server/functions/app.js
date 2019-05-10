/* eslint-disable no-console */

/**
 * This file is only used to deploy the apis need for abt wallet qrcode scanning to work
 */
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import ConnectMongo from 'connect-mongo';

const MongoStore = ConnectMongo(session);

const dev = process.env.NODE_ENV !== 'production';

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
require('../routes')(server);

// Make it serverless
const handler = serverless(server);

exports.handler = async (event, context) => {
  // Do something here
  const result = await handler(event, context);
  return result;
};
