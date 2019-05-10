// used by https://www.npmjs.com/package/netlify-lambda
module.exports = {
  optimization: { minimize: process.env.NODE_ENV === 'production' },
};
