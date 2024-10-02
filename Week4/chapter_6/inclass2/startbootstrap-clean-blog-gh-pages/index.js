const express = require('express');
const path = require('path');
const BlogPost = require('./models/BlogPost.js');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://<user>:<pass>@<domain>@<domain>/my_database?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true }
);

const app = new express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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

  await BlogPost.create(req.body);

  res.redirect('/');
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
