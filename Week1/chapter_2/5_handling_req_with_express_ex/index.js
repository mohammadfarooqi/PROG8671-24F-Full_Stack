// require express module
const express = require('express');

// calls express function to start new Express app
const app = express();

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

/*

const server = http.createServer((req, res) => {
  if (req.url === '/about') res.end('The about page');
  else if (req.url === '/contact') res.end('The contact page');
  else if (req.url === '/') res.end('The home page');
  else {
    res.writeHead(404);
    res.end('page not found');
  }
});

*/

// Handling Request with Express

app.get('/about', (req, res) => {
  res.json({
    name: 'The about page',
  });
});

app.get('/contact', (req, res) => {
  res.json({
    name: 'The contact page',
  });
});

app.get('/', (req, res) => {
  // res.json({
  //   name: 'The home page',
  // });
  res.send('The home page'); // res.send vs res.end
});

app.get('*', (req, res) => {
  res.status(404).json({
    name: 'page not found',
  });
});
