// Creating Server suing builtin module

// dependencies
const http = require('http');

const fs = require('fs');

const url = require('url');

// the app file
const app = {};

// configuration
app.configur = { port: 8080 };

// creating server
app.createServer = () => {
  http.createServer(app.handlereqres).listen(app.configur.port);
};

// response and request functuion
app.handlereqres = (req, res) => {
  // parsing the url
  const urlobject = url.parse(req.url, true);
  const filename = '.' + urlobject.pathname;

  // reading the file from file system module
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Contetn-Type': 'text/html' });
      res.write('Something wrong happend');
      res.end();
    }
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(data);
    res.end();
  });
};

// calling the server

app.createServer();
