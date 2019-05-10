const session = require('./session');
const users = require('./users');
const payments = require('./payments');
const auth = require('./auth');

module.exports = app => {
  session.init(app);
  users.init(app);
  payments.init(app);
  auth.init(app);
};
