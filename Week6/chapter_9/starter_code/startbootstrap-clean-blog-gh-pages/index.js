const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');

const fileUpload = require('express-fileupload');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect('/posts/new');
  }
  next();
};

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

app.post('/posts/store', validateMiddleWare, async (req, res) => {
  console.log(req.body);

  let image = req.files.image;
  // A function to move the file elsewhere on your server. Can take a callback or return a promise.
  image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
    if (error) console.log('error', error);
    await BlogPost.create({
      ...req.body,
      image: '/img/' + image.name,
    });
    res.redirect('/');
  });
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
