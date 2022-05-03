/**
 * ..... Express Webapp .....
 */

const fs = require('fs');
const express = require('express');
const path = require('path');


const app = express();
const port = 8000;

// main prezzy
app.use(express.static(path.join(__dirname, 'public/presentation')));
// app.use(express.static(path.join(__dirname, 'public')));

// where to find node_mods
app.use('/nm', express.static(path.join(__dirname, 'node_modules')));

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

// https://stackoverflow.com/questions/13695046/watch-a-folder-for-changes-using-node-js-and-print-file-paths-when-they-are-cha
// let assetFolder = 'public/presentation/assets';
// let assetWatchers = [];
// fs.watch(path.join(__dirname, assetFolder), (eventType, filename) => {
//   console.log(`${filename} has been ${eventType}d`);

//   fs.exists(path.join(__dirname, assetFolder + "/player"), (e) => {
//     if (!e) return;
    
//     //window.location.reload();
//     // document.getElementById("step2").style.visibility = "visible";
//     // console.log(gShowController.thumbnailContainer.thumbnailItems);
//     // Creating a POST request
//     app.post('/', (req, res) => {
//       console.log("POST Request Called for /api endpoint")
//       res.send("POST Request Called")
//     })
//   });
// });