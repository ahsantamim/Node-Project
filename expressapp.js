const express = require('express');

const path = require('path');

// express app
const app = express();

const time = Date();

// home
app.use('/', (req, res, next) => {
  console.log(
    'A request for things received at for home page ' + time.toString(),
  );
  next();
});
app.get('/', (req, res) => {
  res.sendFile('./index.html', { root: __dirname }); // parsing html file when we get e get request from client
});

// about
app.use('/about', (req, res, next) => {
  console.log(
    'A request has been recieved at for about page:' + time.toString(),
  );
  next();
});
app.get('/about', (req, res) => {
  // res.send('<h1>This is about page</h1>');
  res.sendFile('./about.html', { root: __dirname }); // parsing html file when we get e get request from client
});

// winter
app.use('/winter', (req, res, next) => {
  console.log(
    'A request for things received at for winter page ' + time.toString(),
  );
  next();
});
app.get('/winter', (req, res) => {
  // res.send('<h1>This is about page</h1>');
  res.sendFile('./winter.html', { root: __dirname }); // parsing html file when we get e get request from client
});

// redirects
app.use('/about-us', (req, res, next) => {
  console.log(
    'A request has been made for about-us which will redirect the page to about',
  );
  next();
});
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page must be in the bottom beacuse express check url path in a if else condition
app.use((req, res) => {
  res.status(404).sendFile('./404.html', { root: __dirname });
});
// listen for request
app.listen(3000);
