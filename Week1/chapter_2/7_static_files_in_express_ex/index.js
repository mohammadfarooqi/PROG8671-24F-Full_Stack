// require express module
const express = require('express');
const path = require('path');

// calls express function to start new Express app
const app = express();

// express.static is a packaged shipped with Express that helps us
// serve static files.
// With express.static(‘public’), we specify that any request that ask
// for assets should get it from the ‘public’ directory
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

/*

const homePage = fs.readFileSync('index.html');
const aboutPage = fs.readFileSync('about.html');
const contactPage = fs.readFileSync('contact.html');
const notFoundPage = fs.readFileSync('notfound.html');

const server = http.createServer((req, res) => {
  if (req.url === '/about') res.end(aboutPage);
  else if (req.url === '/contact') res.end(contactPage);
  else if (req.url === '/') res.end(homePage);
  else {
    res.writeHead(404);
    res.end(notFoundPage);
  }
});

*/

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'contact.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, 'notfound.html'));
});
