const session = require('./session');

module.exports = app => {
  session.init(app);
};
