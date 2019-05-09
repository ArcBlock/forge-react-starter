const { Payment } = require('../models');

module.exports = {
  init(app) {
    app.get('/api/payments', async (req, res) => {
      const payment = await Payment.findOne({ did: req.session.user.did });
      res.json(payment ? payment.toObject() : null);
    });
  },
};
