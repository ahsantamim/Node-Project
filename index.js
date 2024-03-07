/*
 *Title: Uptime Monitoring Application
 *Description: A RestFul API to monitor up or down of a user defined links
 *Author: Ahsanul Karim
 *Date: 1/3/2024
 */

// dependencies
const http = require('http');
const url = require('url');
// app object
const app = {};

// configuration
app.config = {
  port: 3000,
};

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port);
};

// handle request and response

app.handleReqRes = (req, res) => {
  // requesthandle
  // get the url then parseit
  const parsedUrl = url.parse(req.url, false);
  const path = parsedUrl.pathname;
  const trimmedpath = path.replace(/^\/+|\/+$/g, '');
  console.log(trimmedpath);
  // response handle
  res.writeHead(200, { 'Content-type': 'text/plane' });
  res.write('Hello World');
  res.end();
  console.log(parsedUrl);
};

app.createServer();
