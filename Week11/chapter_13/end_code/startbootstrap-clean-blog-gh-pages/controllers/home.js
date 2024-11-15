const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
  const blogposts = await BlogPost.find({}).populate('userId');
  console.log('home > req.session', req.session);
  res.render('index', {
    blogposts,
  });
};
