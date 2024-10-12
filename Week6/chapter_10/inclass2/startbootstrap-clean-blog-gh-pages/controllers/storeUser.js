const User = require('../models/User.js');

module.exports = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/');
  } catch (error) {
    console.log('error', error);
    return res.redirect('/auth/register');
  }
};
