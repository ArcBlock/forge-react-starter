const fs = require('fs');
const path = require('path');
const capitalize = require('lodash/capitalize');

const models = fs.readdirSync(__dirname).filter(x => x !== 'index.js');
models.forEach(x => {
  const name = capitalize(path.basename(x, '.js'));
  // eslint-disable-next-line
  module.exports[name] = require(path.join(__dirname, x));
});
