const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (user) {
    bcrypt.compare(password, user.password, (error, same) => {
      if (error) {
        console.log(error);
      }
      if (same) {
        console.log('login pass accepted');
        // if passwords match
        // store user session, will talk about it later
        res.redirect('/');
      } else {
        console.log('login pass unaccepted');
        res.redirect('/auth/login');
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};
