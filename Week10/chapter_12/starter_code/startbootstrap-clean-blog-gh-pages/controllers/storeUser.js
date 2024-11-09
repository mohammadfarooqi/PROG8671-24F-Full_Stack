const User = require('../models/User.js');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log('user created', user);
  } catch (error) {
    console.log('user error', error);
  }
  res.redirect('/');
};
