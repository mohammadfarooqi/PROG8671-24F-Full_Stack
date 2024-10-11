const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
  const blogposts = await BlogPost.find({});
  res.render('index', {
    blogposts,
  });
};
