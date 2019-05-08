module.exports = {
  init(app) {
    app.get('/api/session', async (req, res) => {
      res.json(req.session);
    });

    app.post('/api/logout', async (req, res) => {
      req.session.user = null;
      res.json(req.session);
    });
  },
};
