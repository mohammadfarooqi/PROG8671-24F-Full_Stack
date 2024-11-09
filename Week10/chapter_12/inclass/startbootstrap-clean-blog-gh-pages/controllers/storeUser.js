const User = require('../models/User.js');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log('user created', user);
  } catch (error) {
    console.log('user error', error);

    const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);

    console.log('user validationErrors', validationErrors);

    // req.session.validationErrors = validationErrors;
    req.flash('validationErrors',validationErrors);
    req.flash('data',req.body);

    return res.redirect('/auth/register');
  }
  res.redirect('/');
};
