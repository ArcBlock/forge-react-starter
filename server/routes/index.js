const fs = require('fs');
const path = require('path');

const routes = fs.readdirSync(__dirname).filter(x => x !== 'index.js');

module.exports = app => {
  routes.forEach(x => {
    // eslint-disable-next-line
    const route = require(path.join(__dirname, x));
    route.init(app);
  });
};
