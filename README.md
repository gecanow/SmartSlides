# SmartSlides

A new way to present.

6.835 Spring 2022 Final Project

{*gschein, gecanow, marlenag*}@mit.edu

## Getting Started

Requirements: SmartSlides works best on **Chrome** and with a **Mac laptop**. 

### Mac users
**Clone** (don't download!) this repo, open the SmartSlides folder, and double-click on SmartSlidesBegin to get started. This will walk you though uploading a presentation, installing the necessary dependencies, starting the server, and opening localhost.

If you are having trouble, manually navigate to the project folder in your terminal and run
```
$ npm install
$ npm start
```
Then, open https://localhost:8000 for instructions.

### Windows users
Start the project with
```
$ npm install
$ npm start
```
And open https://localhost:8000 for instructions on how to upload a presentation manually by clicking Help under Step 1. You may need to export it on Keynote via a loaner Mac laptop.

### Navigating the SmartSlides site
Once your presentation is loaded into the project folder (either via SmartSlidesBegin or manually), you can get started by opening localhost:8000, clicking 'Yes' if the slide thumbnails are correct, and clicking 'Customize' to start customizing.

On the customization page, you can add new custom voice or gesture commands and toggle on mouse input. Note that custom gesture commands are currently in beta, and only work if you have a Leap Motion Controller. 

When you are ready to present, click 'Present'. *While presenting, you can press the 'h' key to open an instructions and help page.*

## Code Organization

### SmartSlidesBegin

#### smartslides_script.scpt
SmartSlidesBegin.app is the app-deployed version of smartslides_script.scpt. You can open smartslides_script.scpt on a Mac computer to see exactly what the AppleScript does. 

#### open_slides.sh
SmartSlidesBegin also opens and runs open_slides.sh, which runs ```npm install```, ```npm start```, and ```open localhost:8000``` to automate the process of getting started.

#### Sample Presentation
The project folder has two example presentations: sample_presentation_1.pptx and sample_presentation_2.pptx.

### index.js

index.js is the main entrypoint into the webapp. It sets up the use of Express to power our webapp, and opens public/presentation/index.html. 

### src

src holds the JS files the powers the site itself.

#### thumbnails.js

Responsible for opening and reading in all the thumbnail images from the presentation's assets.

#### download.js

Powers the intro index.html page.

#### customize.js

Powers the customization page and transitioning to the presentation mode.

#### control.js

API for controlling the presentation when displayed on screen.

### public/presentation

Hosts the html pages for the site, the assets folder for the exported presentation, and the app folder for powering the multimodal interaction.

#### app

Powers the multimodel speech and gesture recognition. The main driver is main.js, which hosts Leap.loop and the speech recognition callback.

### Libraries used

#### Site
- bootstrap for ui (popups, icons, etc.)
- express for powering client/server
- browserify for exposing some modules in the browser
- applescript, currently unused, but for potentially deploying the AppleScript automatically

#### App
- WebkitSpeech Recognition
- Leap Motion Controller Gesture Recognition toolkit

## Contact
{*gecanow, gilaschein, marlenag*}@mit.edu
