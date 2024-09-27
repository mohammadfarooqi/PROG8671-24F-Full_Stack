const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connects to our my_database db locally
// mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
mongoose.connect(
  'mongodb+srv://<username>:<password>@cluster0.7mpyoua.mongodb.net/my_database',
  { useNewUrlParser: true }
);

/*
- express adds the .render() function to the res obj
- render function looks for in the views folder for the file index.ejs
*/

app.get('/', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
  const blogposts = await BlogPost.find({});
  res.render('index', {
    blogposts,
  });
});

app.get('/about', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
  res.render('about');
});

app.get('/contact', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
  res.render('contact');
});

app.get('/post/:id', async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
  const blogpost = await BlogPost.findById(req.params.id);
  res.render('post', {
    blogpost,
  });
});

app.get('/posts/new', (req, res) => {
  res.render('create');
});

app.post('/posts/store', async (req, res) => {
  console.log(req.body);

  // BlogPost.create(req.body)
  //   .then((blogpost) => {
  //     res.redirect('/');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  await BlogPost.create(req.body);
  res.redirect('/');
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
