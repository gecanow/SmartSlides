/**
 * ..... Express Webapp .....
 */

 const express = require('express');
 const path = require('path');
 const fileURLToPath = require('url').fileURLToPath;
 
 __filename = fileURLToPath(require('url').pathToFileURL(__filename).toString());
 __dirname = path.dirname(__filename);
 
 const app = express();
 const port = process.env.PORT || "8000";  // TODO: will likely not be used
 
 app.use(express.static(path.join(__dirname, "public/presentation")));
 app.use((request, response, next) => {
   // allow requests from web pages hosted anywhere
   response.set('Access-Control-Allow-Origin', '*');
   next();
 });
 
 app.get('/', (req, res) => {
   const file = path.join(__dirname, 'public', 'presentation', 'index.html');
   console.log("serving", file);
   res.sendFile(file);
 });
 
 app.listen(port, () => {
   console.log(`Listening to requests on http://localhost:${port}`);
 });