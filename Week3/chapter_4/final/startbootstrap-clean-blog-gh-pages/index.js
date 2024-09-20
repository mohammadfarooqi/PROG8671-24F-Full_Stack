const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('public'));

/*
- express adds the .render() function to the res obj
- render function looks for in the views folder for the file index.ejs
*/

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
  res.render('index');
});

app.get('/about', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
  res.render('about');
});

app.get('/contact', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
  res.render('contact');
});

app.get('/post', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
  res.render('post');
});

app.listen(4000, () => {
  console.log('App listening on port 4000');
});
