const { User } = require('../models');

module.exports = {
  init(app) {
    app.get('/api/users', async (req, res) => {
      const users = await User.find({})
        .sort('-createdAt')
        .limit(100);
      res.json(users);
    });
  },
};
