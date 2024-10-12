const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  console.log('username', username);

  try {
    const user = await User.findOne({ username });
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        console.log('same', same);
        if (same) {
          // if passwords match
          // store user session, will talk about it later
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      });
    } else {
      res.redirect('/auth/login');
    }
  } catch (error) {
    console.log('error', error);
  }
};
