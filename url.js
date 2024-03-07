// creating a server for parsing html with url module

const http = require('http');

const fs = require('fs');

const url = require('url');

http
  .createServer((req, res) => {
    const urlobjct = url.parse(req.url, true);
    const filename = '.' + urlobjct.pathname;

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('404 Page not found');
      }
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.end(data);
    });
  })
  .listen(4000);
