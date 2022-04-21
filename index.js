import fs from 'fs';
import readline from 'readline';
import {google} from 'googleapis';
import {LocalSlides} from './dist/slides.js';

/**
 * ..... Google Auth .....
 */

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/script.projects',
    'https://www.googleapis.com/auth/presentations',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/script.scriptapp',
    'https://www.googleapis.com/auth/script.external_request',
    "https://www.googleapis.com/auth/script.container.ui",
    "https://www.googleapis.com/auth/drive.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Apps Script API.
  authorize(JSON.parse(content), callAppsScript);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function callAppsScript(auth) {
    const script = google.script({version: 'v1', auth});
    const testPres = new LocalSlides.Presentation(
        "https://docs.google.com/presentation/d/1tU0eKjSBrao0HulvnHbxmqmQodEwwGlMQjiL5TgtBvc/edit#slide=id.g11a0a99757a_0_0", 
        "https://script.google.com/d/1ZC1gCS9uTmXUOt8dvrkvK-VWdt_oPoYNu7lS9qDYRG6tXUAmPM1PjNyG/edit?mid=ACjPJvGXZrqhwz6j4ApQIgBQtiVMe5EOVmeTr721yqIdhNFlKTJDxmtjeX1y2KdCSZLih8vkF6Zd0zz5r8GhNSU6ZIWmHORJtzil45TJFBFsBv8qr0_4efX98QPvWGDDEir4vYIpm0C5HWLI&uiv=2",
        auth
    );
    testPres.exportSlides();
}

/**
 * ..... Express Webapp .....
 */

import express from "express";
import path from "path";
import {fileURLToPath} from 'url';
import { constants } from 'buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || "8000";  // TODO: will likely not be used

app.use(express.static(path.join(__dirname, "public")));
app.use((request, response, next) => {
  // allow requests from web pages hosted anywhere
  response.set('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});