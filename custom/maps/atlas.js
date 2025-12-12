const opentype = require('opentype.js')
const fs = require('fs')

console.error( " ", process.argv[2])
var filename = 'grg.otf'
filename = process.argv[2]

const htmlPre =
  "<html> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> </head> <body> <style> body { background: rgb(204, 204, 204); font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 2em; } @page { size: 210mm 297mm; _margin: 10mm; } page[size='A4'] { background: white; width: 21cm; height: 29.7cm; display: block; margin: 0 auto; margin-bottom: 0.5cm; border: 0; padding: 0; } @media screen { page { box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5); } } @media print { body, page[size='A4'] { margin: 0; border: 0; padding: 0; box-shadow: 0; } } .foldmark { position: relative; width: 6mm; left: 7mm; top: 140mm; border-top: 1pt solid black; } .foldmark { position: relative; width: 6mm; height: 0; left: 7mm; top: 140mm; border-top: 1pt solid black; } .source { transform: rotate(90deg); font-size: 6pt;} .mirror { position: relative; max-width: 180mm; left: 20mm; top: 10mm; margin: 0; border: .5pt solid black; padding: 0; } .headbox { position: relative; _width: 100%; height: 8mm; border: .5pt solid black; text-align: center; } .bodybox { position: relative; _width: 100%; height: 23cm; border: .5pt solid black; display: grid; 3 justify-items: center; 4 align-items: center; } .drawing { margin: auto; } .footbox { position: relative; _max-width: 180.5mm; background-color: white; _border: .5pt solid black; _border-top: 0; display: flex; flex-wrap: wrap; } .footcase { height: 8mm; width: 58mm; background-color: white; border: .5pt solid black; text-align: center; overflow: hidden; flex-grow: 1; flex-shrink: 1; } svg { _border: 1pt solid red; width: 178mm; height: 228mm; } .pGlyph { fill: black; fill-opacity: .12; stroke: black; stroke-width: 1 pt; } .pCadence { fill: red; fill-opacity: .3; stroke: none;  } .pCadenceV { fill: red; fill-opacity: .5; stroke: none; #cadenceCalculator { display: none; }} </style>"
const svgPre =
  "<page size='A4'> <div class='foldmark'><p class='source'>github.com/jrgdrs/GlyphAtlas</p></div> <div class='mirror'> <div class='headbox'>((filename))</div> <div class='bodybox'> <div class='drawing'> <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='((bbox))'> <g id='/Letters'>"
const svgPost =
  "</g></svg> </div> </div> <div class='footbox'> <div class='footcase'>unitsPerEm: ((unitsPerEm))</div> <div class='footcase'><b>((fontFamily))</b></div> <div class='footcase'>Width: ((advanceWidth))</div> <div class='footcase'>LSB:((leftSB))</div> <div class='footcase'>Fill:((coverX))</div> <div class='footcase'>RSB: ((rightSB)) </div> <div class='footcase'>((version))</div> <div class='footcase'>((glyphID))</div> <div class='footcase'>Cadence: ((cadence))</div> </div> </div> </page>"
const htmlPost = '</body></html>';

// https://stackoverflow.com/questions/11975349/glyph-width-in-open-type-font

(async () => {
  const buffer = fs.readFileSync(filename, null).buffer
  const font = opentype.parse(await buffer)

  // font spec
  let fontModified = new Date(font.tables.head.modified * 1000); // fontMod.toISOString()
  let fontCreated = new Date(font.tables.head.created * 1000);
  let fontXMin = font.tables.head.xMin;
  let fontYMin = font.tables.head.yMin;
  let fontXMax = font.tables.head.xMax;
  let fontYMax = font.tables.head.yMax;
  console.error( " ", fontModified.toISOString(), fontCreated.toISOString(), fontXMin, fontYMin, fontXMax, fontYMax);

  let fontAngle = Math.abs( font.tables.post.italicAngle === undefined ? 0 : font.tables.post.italicAngle );
  console.error( "  fontAngle", fontAngle); ///20250225

  let psname = font.tables.name.postScriptName.en;
  console.error( " ", psname);

  let unitsPerEm = font.unitsPerEm
  let ascender = font.ascender
  let descender = Math.abs(font.descender)
  let fontFamily = font.tables.name.fontFamily.en .replaceAll(' ', '_') .replaceAll('.', '_')
  console.error( " ", unitsPerEm, ascender, descender, fontFamily );
  var svgCollection = ''

  // get glyphs
  let glyphs = font.glyphs.glyphs
  let keys = Object.keys(glyphs).length

  ///HIER
  // each glyph
  for (let i = 0; i < keys; i++) {
    let glyph = glyphs[i]

    if (glyph) {

      let bbox = glyph.getBoundingBox();

      // glyph spec
      let lineHeight = ascender + descender
      let leftSB = glyph.leftSideBearing
      let rightSB = glyph.advanceWidth - Math.round(bbox.x2)
      let glyphW = glyph.advanceWidth
      let poxX = 0
      let coverX = Math.round(bbox.x2 ) - Math.round(bbox.x1 );

      // legt den ausschnitt des svg fest in der voewbpx
      // height-controller /8
      let bboxString = Math.round(bbox.x1 ) + " " + ( descender / 8 ) + " " + Math.round(bbox.x2) + " " + ( lineHeight + 200 );

      // adjust negative widths
      if (glyph.advanceWidth + leftSB < 0) {
        glyphW =
          Math.abs(leftSB) + Math.abs(glyph.advanceWidth) + Math.abs(rightSB)
        poxX = Math.abs(leftSB)
      }

      // get svg path
      let pathData = glyph.getPath(poxX, ascender, unitsPerEm).toPathData(2)

      let glyphId = glyph.name ? glyph.name.replaceAll('.', '_') : glyph.unicode ? glyph.unicode : glyph.index

      if (pathData) {
        let letter = glyph.name
        ///console.error(letter, glyphW, leftSB, rightSB, poxX)

        //Glyph
        var myPath = glyph.getPath(poxX, ascender, unitsPerEm); //font.getPath(letter, poxX, ascender, 1000) ///OKJOKOK
        
        var mySVG = pathData //myPath.toPathData()
        var myGlyphString = '<path class="pGlyph" d="' + mySVG + '"/>\r\n'

        // LSB RSB
        var myBearingString = '<path class="pCross" d="' + getMyCross( 0, ascender ) + getMyCross( glyphW, ascender ) + '"/>\r\n'

        //Cadence
        var myCadence = 22; /// CADENCE
        var myAngle = fontAngle; // ANGLE e.g. 15 degree
        var myCadenceString = '<path class="pCadence" d="' + getGutter( 0, glyphW, myCadence, myAngle )  + '"/>\r\n'
                           + '<path class="pCadenceV" d="' + getGutter( 0, glyphW, myCadence * 5, myAngle )  + '"/>\r\n'
        var myCadenceCount = glyphW / myCadence;

        //Marker
        var myOut = ''
        var remember = []
        myPath.commands.forEach(myPoint => {
          switch (myPoint.type) {
            case 'Q':
              myOut += getMyMarker(myPoint.x, myPoint.y)
              break
            case 'C':
              myOut += getMyCircle(myPoint.x, myPoint.y)
              myOut += getMyConnect( myPoint.x, myPoint.y, myPoint.x2, myPoint.y2 )
              myOut += getMyConnect( remember[0], remember[1], myPoint.x1, myPoint.y1 )
              myOut += getMySmallCircle(myPoint.x1, myPoint.y1)
              myOut += getMySmallCircle(myPoint.x2, myPoint.y2)
              break
            case 'L':
              myOut += getMyCircle(myPoint.x, myPoint.y)
              break
            case 'M':
              myOut += getMyCircle(myPoint.x, myPoint.y)
              break
            default:
              break
          }
          remember = [myPoint.x, myPoint.y]
        })
        var myMarkString = '<path class="pMark" d="' + myOut + '"/>\r\n'

        svgCollection +=
          svgPre.replace('((filename))', filename)
            .replace("((bbox))", bboxString) +
          myBearingString +
          //myMetricString +
          myGlyphString +
          myMarkString +
          myCadenceString +
          svgPost
            .replace('((unitsPerEm))', unitsPerEm)
            .replace('((fontFamily))', psname) // fontFamily)
            .replace('((advanceWidth))', glyphW)
            .replace('((leftSB))', leftSB)
            .replace('((coverX))', coverX)
            .replace('((rightSB))', rightSB)
            .replace('((version))', fontModified)
            .replace('((glyphID))', glyphId + " (" + glyph.unicode + ")" )
            .replace('((cadence))', myCadenceCount.toFixed(1) + " x " + myCadence )

      } else {
        ///console.error( "NO PATHDATA for", glyphId)
      }
    } else {
      ///console.error( "NO GLYPH on sequence", i )
    }
  }

  ///console.error("ENDE")
  console.log(htmlPre + svgCollection + htmlPost)

})()

function getGutterOld( x, w, f ){ // x start, w width, f frequency
  let h = 1400; 
  let y = 400;
  let outstring = "";
  for( i = 0; i * f < w + 8 ; i++ ){
    outstring += 'M' + ( i * f + x ) + ' ' + h + ' ' + 'l0 -' + h + ' ' + 'l1 0 ' + 'l0 ' + h + ' ' + 'l-1 0 Z '
  }  
  return( outstring )
}

function getGutter( x, w, f, angle ){ // x start, w width, f frequency
  let h = 1400; 
  let y = 400;
  let outstring = "";
  let s = Math.round( Math.tan((angle * Math.PI) / 180) * h ); // Gegenkathete
  let t = Math.round( s * y / h * 1.58); // Position y=0

  for( i = 0; i * f < w + 8 ; i++ ){
    outstring += 'M' + ( i * f + x - t ) + ' ' + h + ' ' + 'l' + s + ' -' + h + ' ' + 'l1 0 ' + 'l-' + s + ' ' + h + ' ' + 'l-1 0 Z '
  }  
  return( outstring )
}

const markerSize = 3
function getMyMarker (x, y) {
  var localMarkerSize = Math.round(markerSize * 1.3)
  return (
    'M' + (x - localMarkerSize) + ' ' + (y - localMarkerSize) + ' ' + 
    'L' + (x + localMarkerSize) + ' ' + (y - localMarkerSize) + ' ' + 
    'L' + (x + localMarkerSize) + ' ' + (y + localMarkerSize) + ' ' + 
    'L' + (x - localMarkerSize) + ' ' + (y + localMarkerSize) + ' ' + 
    'L' + (x - localMarkerSize) + ' ' + (y - localMarkerSize) + ' ' + 'Z '
  )
}

function getMyCircle (x, y) {
  var localMarkerSize = Math.round(markerSize * 1.6)
  return (
    'M' + x + ' ' + y + ' ' + 'm' + localMarkerSize + ' ' + 0 + ' ' + 
    'a' + localMarkerSize + ',' + localMarkerSize + ' 0 1,0 -' + localMarkerSize * 2 + ',0 ' + 
    'a' + localMarkerSize + ',' + localMarkerSize + ' 0 1,0 ' + localMarkerSize * 2 + ',0 Z '
  )
}

function getMySmallCircle (x, y) {
  var localMarkerSize = Math.round(markerSize * 0.8);
  return (
    'M' + x + ' ' + y + ' ' + 'm' + localMarkerSize + ' ' + 0 + ' ' + 
    'a' + localMarkerSize + ',' + localMarkerSize + ' 0 1,0 -' + localMarkerSize * 2 + ',0 ' + 
    'a' + localMarkerSize + ',' + localMarkerSize + ' 0 1,0 ' + localMarkerSize * 2 + ',0 Z '
  )
}

function getMyCross(x,y){
  var localMarkerSize = 60;
  return(
    'M' + x + ' ' + y + ' ' + 'm-1 -' + ( localMarkerSize + 1 ) + ' ' + 
    'l2 0 ' + 'l0 ' + localMarkerSize + ' ' + 'l' + localMarkerSize + ' 0 ' + 
    'l0 2 ' + 'l-' + localMarkerSize + ' 0 ' + 'l0 ' + localMarkerSize + ' ' + 
    'l-2 0 ' + 'l0 -' + localMarkerSize + ' ' + 'l-' + localMarkerSize + ' 0 ' + 
    'l0 -2 ' + 'l' + localMarkerSize + ' 0 ' + 'l0 -' + localMarkerSize + ' ' + 'Z '
  )
}

function getMyTriangle (x, y) {
  var localMarkerSize = Math.round(markerSize * 1.6)
  return (
    'M' + x + ' ' + y + ' ' + 
    'm' + localMarkerSize / 2 + ' ' + (localMarkerSize * 1) / 3 + ' ' + 
    'l-' + localMarkerSize / 2 + ',-' + localMarkerSize + ' ' + 
    'l-' + localMarkerSize / 2 + ',' + localMarkerSize + ' ' + 
    'l' + localMarkerSize + ',' + 0 + ' Z'
  )
}

function getMyConnect (xa, ya, xb, yb) {
  var myStokeWidth = 1
  return (
    'M' + xa + ' ' + ya + ' ' + 
    'L' + (xa + myStokeWidth) + ' ' + (ya + myStokeWidth) + ' ' + 
    'L' + (xb + myStokeWidth) + ' ' + (yb + myStokeWidth) + ' ' + 
    'L' + xb + ' ' + yb + ' ' + 'L' + xa + ' ' + ya + ' ' + 'Z '
  )
}
