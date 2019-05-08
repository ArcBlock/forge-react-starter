/* eslint-disable no-console */
// customising the .env file in your project's root folder.
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const next = require('next');
const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const { name, version } = require('./package.json');

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create next.js application
const app = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: path.join(__dirname, './client'),
});

// Prepare next.js application
app.prepare().then(() => {
  const handle = app.getRequestHandler();

  // Create and config express application
  const server = express();
  server.use(cors());

  // eslint-disable-next-line global-require
  require('./server/routes')(server);

  server.get('*', (req, res) => handle(req, res));

  const port = parseInt(process.env.PORT, 10) || 3000;
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> ${name} v${version} ready on http://localhost:${port}`);
  });
});
