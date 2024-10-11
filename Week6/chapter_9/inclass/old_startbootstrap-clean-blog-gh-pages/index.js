const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');

const newPostController = require('./controllers/newPost.js');
const homeController = require('./controllers/home.js');
const getPostController = require('./controllers/getPost.js');

const validateMiddleware = require('./middlewares/validateMiddleware.js');

const fileUpload = require('express-fileupload');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

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

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', validateMiddleware, async (req, res) => {
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
