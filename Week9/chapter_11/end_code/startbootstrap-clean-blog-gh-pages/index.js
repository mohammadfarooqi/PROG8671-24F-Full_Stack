const express = require('express');
const expressSession = require('express-session');

const app = new express();
const ejs = require('ejs');

const mongoose = require('mongoose');

const fileUpload = require('express-fileupload');

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

global.loggedIn = null;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(
  expressSession({
    secret: 'keyboard cat',
  })
);

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

// MongoDB connects to our my_database db locally
// mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });
mongoose.connect(
  'mongodb+srv://<username>:<password>@cluster0.7mpyoua.mongodb.net/my_database',
  { useNewUrlParser: true }
);

app.get('/posts/new', authMiddleware, newPostController);
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.post(
  '/posts/store',
  authMiddleware,
  // validateMiddleware,
  storePostController
);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post(
  '/users/register',
  redirectIfAuthenticatedMiddleware,
  storeUserController
);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post(
  '/users/login',
  redirectIfAuthenticatedMiddleware,
  loginUserController
);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
