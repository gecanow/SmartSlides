/*
Notes for dev:
- may need to run `npm install googleapis ts-node typescript yargs @types/yargs @types/node` to install googleapis for use in .ts files

For Google Apps Scripts, follow: 
- https://developers.google.com/apps-script/guides/typescript
- https://github.com/google/clasp/blob/master/docs/typescript.md 

*/
import fs from 'fs';
import { GaxiosPromise } from 'gaxios';
import {drive_v3, google} from 'googleapis';
import { Stream } from 'stream';
// https://www.npmjs.com/package/asposeslidescloud
import {ExportFormat, SlidesApi} from "asposeslidescloud";

const PRES_GRAMMAR = /https:\/\/docs.google.com\/presentation\/d\/(?<presentationId>[a-zA-Z0-9-_]+)\/edit/mg;
const SCRIPT_GRAMMAR = /https:\/\/script.google.com\/d\/(?<scriptID>[a-zA-Z0-9-_]+)\/edit/mg
const DEPLOYED_SCRIPT_ID = "AKfycbwMLvoyr5haSRI_BHDSaCnVNnv7LBuh5SX3kSSbqGLX5t4u9KCAsaGezKxXShuMP8-D-g";

export namespace LocalSlides {
    export let presentationID: string;
    export let scriptID: string;

    export class Presentation {
        private readonly slidesHook;
        private readonly scriptHook;

        constructor(presURL: string, scriptURL: string,
            public readonly auth: any,
        ) {
            LocalSlides.presentationID = PRES_GRAMMAR.exec(presURL)?.groups?.presentationId ?? "unknown";
            LocalSlides.scriptID = SCRIPT_GRAMMAR.exec(scriptURL)?.groups?.scriptID ?? "unknown";
            this.slidesHook = google.slides({version: 'v1', auth});
            this.scriptHook = google.script({version: 'v1', auth});
            this.setScriptID();
        }

        private setScriptID(): void {
            fs.readFile('.clasp.json', (err, content) => {
                if (err) return console.log('Error loading clasp file:', err);
                // Authorize a client with credentials, then call the Google Slides API.
                let currClaspDict = JSON.parse(content.toString());
                currClaspDict.scriptId = LocalSlides.scriptID;
                fs.writeFile('.clasp.json', JSON.stringify(currClaspDict), (err) => {
                    if (err) return console.error(err);
                    console.log('.clasp.json updated with script ID', LocalSlides.scriptID);
                });
            });
        }

        public log(): void {
            this.slidesHook.presentations.get({
                presentationId: LocalSlides.presentationID,
            }, (err, res: any) => {
                if (err) console.log('The API returned an error: ' + err);
                else {
                    const length = res.data.slides.length;
                    console.log(`This presentation contains ${length} slides:`);
                    res.data.slides.forEach((slide:any, i:number) => {
                        console.log(`\t- Slide #${i + 1} contains ${slide.pageElements.length} elements.`);
                    });
                }
            });
        }

        // Need to do this instead of an iframe because: https://issuetracker.google.com/issues/36760981
        public async exportSlides(): Promise<void> {
            const drive: drive_v3.Drive = google.drive({version: 'v3', auth: this.auth});

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
                const res = await ((drive.files.export(
                    {fileId: presentationID, mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'},
                    {responseType: 'stream'}
                ) as unknown) as GaxiosPromise<Stream>);
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
                // await asposeSlidesApi
                //         .convert(fs.createReadStream("./public/presentation.pptx"), ExportFormat.Html5)
                //         .then((response) => {
                //             fs.writeFile('./public/presentation.html', response.body, (err) => { if (err) console.log("Error:", err) });
                //         });
            }
        }

        // https://developers.google.com/apps-script/api/how-tos/execute
        // https://developers.google.com/apps-script/api/reference/rest/v1/scripts/run 
        public nextSlide(auth: any): void {
            console.log(`Attempting to advance to next slide on script ${DEPLOYED_SCRIPT_ID}...`);

            // Make the API request. The request object is included here as 'resource'.
            this.scriptHook.scripts.run({
                auth: auth,
                scriptId: DEPLOYED_SCRIPT_ID,
                requestBody: { function: 'drawCircle'},
            }, function(err: any, resp: any) {
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
                    if (error) return console.log("Found response is done with error details:\n" , error.details[0]);
                    console.log(resp);
                }
            });
        }
    }
}