// code from example 1 in chapter 1
/*
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end('Hello Node.js');
});

server.listen(3000);
*/

// require express module
const express = require('express');

// calls express function to start new Express app
const app = express();

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
