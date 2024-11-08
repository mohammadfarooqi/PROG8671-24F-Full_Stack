const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session?.userId);
    if (!user) return res.redirect('/');
  } catch (error) {
    console.log('error', error);
    return res.redirect('/');
  }

  next();
};
