/**
 * ..... Express Webapp .....
 */

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// main prezzy
app.use(express.static(path.join(__dirname, 'public/presentation')));

// where to find node_mods
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

// src
app.use('/src', express.static(path.join(__dirname, 'src')));


app.use((request, response, next) => {
  // allow requests from web pages hosted anywhere
  response.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', function(req, res) {
  const file = path.join(__dirname, 'public', 'presentation', 'index.html');
  console.log("serving", file);
  res.sendFile(file);
});

app.listen(port, function() {
  console.log(`Listening to requests on http://localhost:${port}`)
});