//node print.js /documentation/Specimen.html
//node print.js qa/Kerning.html fonts/ttf/Wittgenstein-Regular.ttf qa/kern-Regular.pdf        

var puppeteer = require('puppeteer');
var INFILE = "/" + process.argv[2];
var PDFFILE = "./" + process.argv[4]; //
if( process.argv[4] == undefined ){
    PDFFILE = "./" + process.argv[2] + '.pdf';
} 
var PNGFILE = "./" + process.argv[2] + '.png';
var FONTFILE = "../" + process.argv[3]; //fonts/ttf/Wittgenstein-SemiBoldItalic.ttf";

console.log( "  node printProof.js " + INFILE + " " + FONTFILE + " " + PDFFILE + " "  );

( async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file://' + process.cwd() + INFILE, { 'waitUntil' : 'domcontentloaded'});

    await page.addStyleTag({content: '@font-face{font-family: TESTFONT; src: url( ' + FONTFILE + '); }'})

    await delay(500);

    await page.emulateMediaType('print'); 
    await page.pdf({ 
        path: PDFFILE, 
        printBackground: true, 
        preferCSSPageSize: true, 
        
        displayHeaderFooter: true,
        headerTemplate: '<html></html>',
        footerTemplate: 
        `
            <div style="width: 100%; height: 8mm; text-align: center; font-family: Times; font-size: 8pt;">
            ` + process.argv[2] + ` - ` + process.argv[3] + 
            ` - <span class='date''></span> - <span class='pageNumber''></span> / <span class='totalPages'></span>
            </div>
            `
        //<span class='url''></span>

    })

    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }