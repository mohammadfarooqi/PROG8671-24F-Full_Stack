const User = require('../models/User');

module.exports = async (req, res, next) => {
  const users = await User.findById(req.session.userId);

  if (!user) return res.redirect('/');
  next();
};
