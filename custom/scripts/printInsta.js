//node print.js /documentation/Specimen.html
//node printImage.js documentation/Image.html fonts/ttf/Wittgenstein-Regular.ttf documentation/Image.pdf    

const opentype = require('opentype.js');
const { execSync } = require('child_process');


var puppeteer = require('puppeteer');
var INFILE = "/" + process.argv[2];
var PNGFILE = "./" + process.argv[4]; //
if( process.argv[4] == undefined ){
    PNGFILE = "./" + process.argv[2] + '.png';
} 
var FONTFILE = "../" + process.argv[3]; //fonts/ttf/Wittgenstein-SemiBoldItalic.ttf";

console.log( "  node printImage.js " + INFILE + " " + FONTFILE + " " + PNGFILE  );

( async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file://' + process.cwd() + INFILE, { 'waitUntil' : 'domcontentloaded'});

    await page.addStyleTag({content: '@font-face{font-family: TESTFONT; src: url( ' + FONTFILE + '); }'})

            const font = opentype.loadSync(process.argv[3]);

            // Constants that are worked out dynamically
            const MY_URL = execSync("git remote get-url origin").toString().trim();
            const MY_HASH = execSync("git rev-parse --short HEAD").toString().trim();
            const FONT_NAME = font.names.fullName.en;
            const FONT_VERSION = `v${font.tables.head.fontRevision.toFixed(3)}`;
            console.log (" ", MY_URL,MY_HASH, FONT_NAME, FONT_VERSION );

            //        .fontname::before{ content: "Fontname"; } 
            await page.addStyleTag({content: '.MY_URL::before{ content: "' + MY_URL + ' at commit ' + MY_HASH + '"; }'})
            await page.addStyleTag({content: '.FONT_NAME::before{ content: "' + FONT_NAME + '"; }'})
            await page.addStyleTag({content: '.FONT_VERSION::before{ content: "' + FONT_VERSION + '"; }'})

    await delay(500);
/*
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
    */
    //2048px 1024px;
    await page.setViewport({ width: 1080, height: 1440, deviceScaleFactor: 1 });
    await page.screenshot({ path: PNGFILE });  
    await browser.close();
})();

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }