var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
Notes for dev:
- may need to run `npm install googleapis ts-node typescript yargs @types/yargs @types/node` to install googleapis for use in .ts files

For Google Apps Scripts, follow:
- https://developers.google.com/apps-script/guides/typescript
- https://github.com/google/clasp/blob/master/docs/typescript.md

*/
import fs from 'fs';
import { google } from 'googleapis';
// https://www.npmjs.com/package/asposeslidescloud
import { ExportFormat, SlidesApi } from "asposeslidescloud";
// https://dashboard.aspose.cloud/applications/edit/57724
const asposeSlidesApi = new SlidesApi("4e64fae9-80b4-40c7-adc2-1bd30267de9b", "67bacc84a64979408c76646e20e8e2f8");
const PRES_GRAMMAR = /https:\/\/docs.google.com\/presentation\/d\/(?<presentationId>[a-zA-Z0-9-_]+)\/edit/mg;
const SCRIPT_GRAMMAR = /https:\/\/script.google.com\/d\/(?<scriptID>[a-zA-Z0-9-_]+)\/edit/mg;
const DEPLOYED_SCRIPT_ID = "AKfycbwMLvoyr5haSRI_BHDSaCnVNnv7LBuh5SX3kSSbqGLX5t4u9KCAsaGezKxXShuMP8-D-g";
export var LocalSlides;
(function (LocalSlides) {
    class Presentation {
        constructor(presURL, scriptURL, auth) {
            var _a, _b, _c, _d, _e, _f;
            this.auth = auth;
            LocalSlides.presentationID = (_c = (_b = (_a = PRES_GRAMMAR.exec(presURL)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.presentationId) !== null && _c !== void 0 ? _c : "unknown";
            LocalSlides.scriptID = (_f = (_e = (_d = SCRIPT_GRAMMAR.exec(scriptURL)) === null || _d === void 0 ? void 0 : _d.groups) === null || _e === void 0 ? void 0 : _e.scriptID) !== null && _f !== void 0 ? _f : "unknown";
            this.slidesHook = google.slides({ version: 'v1', auth });
            this.scriptHook = google.script({ version: 'v1', auth });
            this.setScriptID();
        }
        setScriptID() {
            fs.readFile('.clasp.json', (err, content) => {
                if (err)
                    return console.log('Error loading clasp file:', err);
                // Authorize a client with credentials, then call the Google Slides API.
                let currClaspDict = JSON.parse(content.toString());
                currClaspDict.scriptId = LocalSlides.scriptID;
                fs.writeFile('.clasp.json', JSON.stringify(currClaspDict), (err) => {
                    if (err)
                        return console.error(err);
                    console.log('.clasp.json updated with script ID', LocalSlides.scriptID);
                });
            });
        }
        log() {
            this.slidesHook.presentations.get({
                presentationId: LocalSlides.presentationID,
            }, (err, res) => {
                if (err)
                    console.log('The API returned an error: ' + err);
                else {
                    const length = res.data.slides.length;
                    console.log(`This presentation contains ${length} slides:`);
                    res.data.slides.forEach((slide, i) => {
                        console.log(`\t- Slide #${i + 1} contains ${slide.pageElements.length} elements.`);
                    });
                }
            });
        }
        // Need to do this instead of an iframe because: https://issuetracker.google.com/issues/36760981
        exportSlides() {
            return __awaiter(this, void 0, void 0, function* () {
                const drive = google.drive({ version: 'v3', auth: this.auth });
                // const dest = fs.createWriteStream('./public/presentation.pdf');
                // get response from the drive export
                // const res = await ((drive.files.export(
                //     {fileId: presentationID, mimeType: 'application/pdf'},
                //     {responseType: 'stream'}
                // ) as unknown) as GaxiosPromise<Stream>);
                // // write the response to a PDF file to embed in the site
                // res.data
                //     .on('end', function () {
                //         console.log('Done');
                //     })
                //     .on('error', function (err) {
                //         console.log('Error during download', err);
                //     })
                //     .pipe(dest);
                if (!fs.existsSync('./public/presentation.html')) {
                    // first convert to pptx
                    const dest = fs.createWriteStream('./public/presentation.pptx');
                    const res = yield drive.files.export({ fileId: LocalSlides.presentationID, mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }, { responseType: 'stream' });
                    // write the response to a PDF file to embed in the site
                    res.data
                        .on('end', function () {
                        console.log('Done');
                    })
                        .on('error', function (err) {
                        console.log('Error during download', err);
                    })
                        .pipe(dest);
                    // then to HTML
                    yield asposeSlidesApi
                        .convert(fs.createReadStream("./public/presentation.pptx"), ExportFormat.Html5)
                        .then((response) => {
                        fs.writeFile('./public/presentation.html', response.body, (err) => { if (err)
                            console.log("Error:", err); });
                    });
                }
            });
        }
        // https://developers.google.com/apps-script/api/how-tos/execute
        // https://developers.google.com/apps-script/api/reference/rest/v1/scripts/run 
        nextSlide(auth) {
            console.log(`Attempting to advance to next slide on script ${DEPLOYED_SCRIPT_ID}...`);
            // Make the API request. The request object is included here as 'resource'.
            this.scriptHook.scripts.run({
                auth: auth,
                scriptId: DEPLOYED_SCRIPT_ID,
                requestBody: { function: 'drawCircle' },
            }, function (err, resp) {
                if (err) {
                    // The API encountered a problem before the script started executing.
                    console.log('The API returned an error: ', err);
                    return;
                }
                if (resp.error) {
                    // The API executed, but the script returned an error.
                    const error = resp.error.details[0];
                    console.log('Script error message: ' + error.errorMessage);
                    console.log('Script error stacktrace:');
                    if (error.scriptStackTraceElements) {
                        // There may not be a stacktrace if the script didn't start executing.
                        for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
                            const trace = error.scriptStackTraceElements[i];
                            console.log('\t%s: %s', trace.function, trace.lineNumber);
                        }
                    }
                    return;
                }
                if (resp.data.done) {
                    const error = resp.data.error;
                    if (error)
                        return console.log("Found response is done with error details:\n", error.details[0]);
                    console.log(resp);
                }
            });
        }
    }
    LocalSlides.Presentation = Presentation;
})(LocalSlides || (LocalSlides = {}));
//# sourceMappingURL=slides.js.map