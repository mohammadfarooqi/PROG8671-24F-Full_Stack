const express = require('express');

const app = new express();
const ejs = require('ejs');

const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');

const validateMiddleware = require('./middleware/validateMiddleware');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

// MongoDB connects to our my_database db locally
// mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://<username>:<password>@<domain>/my_database', {
  useNewUrlParser: true,
});

/*
- express adds the .render() function to the res obj
- render function looks for in the views folder for the file index.ejs
*/

app.get('/', homeController);

app.get('/post/:id', getPostController);

app.get('/posts/new', newPostController);

app.post('/posts/store', validateMiddleware, storePostController);

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
