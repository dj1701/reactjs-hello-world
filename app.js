"use strict";

const path = require('path');
const express = require('express');

const app = express();

module.exports = (port) => {

  app.set('port', port || 4000);
  app.set('view engine', 'html');

  app.get("/private/health", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/dist/bundle.js", (req, res) => {
    res.sendFile('bundle.js', { root: path.join(__dirname, '/public/dist/') });
  });

  app.get('/helloworld', (req, res) => {
     res.set({'content-type': 'text/html'});
     res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  app.server = app.listen(app.get('port'));

  return app;
}
