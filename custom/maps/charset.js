//node scripts/charset.js ../fonts/ttf/Kierkegaard-Regular.ttf > charset.html  

const opentype = require('opentype.js')
const fs = require('fs')

console.error(" ", process.argv[2])
var filename = 'grg.otf'
filename = process.argv[2]

const boxesPerLine = 32; //12
var boxSize = 160 / ( boxesPerLine + 1 );
var labelFontSize = Math.floor( 80 / boxesPerLine );

const htmlPre =
  "<html> <head> <meta charset='utf-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0'><style> @page { size: A2 portrait; margin: 15mm; } body { margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif; } .page { display: grid; grid-template-columns: repeat(auto-fill, minmax(var(--box-size), 1fr)); gap: 1mm; } :root { --box-size: " + boxSize + "mm; } .box { width: var(--box-size); height: var(--box-size); background: black; position: relative; } .label { font-size: " + labelFontSize + "pt; color: goldenrod; text-align: center; margin:.5em;} @media print { .page { break-after: page; } } svg { width: 100%; height: 120%; } .pGlyph { fill: white; } </style></head><body><div class='page'>"
const svgPre =
  "<div> <div class='box'> <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='((bbox))'> <g id='/Letters'>"
const svgPost =
  "</g></svg> </div> <div class='label'>((glyphID))</div> </div>"
const htmlPost = '</div></body></html>';

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
  let ascender = font.ascender + 120 // offset von oben
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
          //myBearingString +
          //myMetricString +
          myGlyphString +
          //myMarkString +
          //myCadenceString +
          svgPost
            .replace('((unitsPerEm))', unitsPerEm)
            .replace('((fontFamily))', psname) // fontFamily)
            .replace('((advanceWidth))', glyphW)
            .replace('((leftSB))', leftSB)
            .replace('((coverX))', coverX)
            .replace('((rightSB))', rightSB)
            .replace('((version))', fontModified)
            .replace('((glyphID))', glyphId )
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
