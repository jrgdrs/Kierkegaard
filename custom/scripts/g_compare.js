#!/usr/bin/env node
'use strict'

// Usage: node g_compare.js [VERSIONS_OUT_DIR] [OUT_HTML] [GLYPH] [SCALE|"bbox"] [FILTERS]
// Default: VERSIONS_OUT_DIR = "versions_out", OUT_HTML = "g-compare.html" (written next to this script)
// GLYPH: single character to render (default 'g')
// SCALE: either 'bbox' (default) to scale by max glyph bbox height, or a number (e.g., 1000) for target UPM
// FILTERS: optional comma-separated substrings to filter which OTF filenames to include (case-insensitive).
// Example FILTERS: "Kierkegaard-Italic" or "Kierkegaard-Italic,Kierkegaard-Regular" will include files whose filename or label contains any of those substrings.

const fs = require('fs')
const path = require('path')
const opentype = require('opentype.js')

const argv = process.argv.slice(2)
const VERSIONS_OUT = argv[0] || path.join(__dirname, '..', '..', 'versions_out')
const OUT_HTML = argv[1] || path.join(__dirname, 'g-compare.html')
const GLYPH = argv[2] || 'g'
// Scaling behavior: default is 'bbox' (scale each glyph so its bbox height becomes the max bbox height)
// Optional 4th argument can be a number to force a target UPM (e.g. 1000)
const SCALE_ARG = argv[3] || 'bbox'
let TARGET_UPM = null
let USE_BBOX = false
if (SCALE_ARG === 'bbox') {
  USE_BBOX = true
} else {
  const n = Number(SCALE_ARG)
  if (!Number.isNaN(n) && n > 0) TARGET_UPM = n
  else { console.error('Invalid scaling argument:', SCALE_ARG); process.exit(2) }
}

// optional filters argument (comma-separated substrings, case-insensitive)
const FILTERS_ARG = argv[4] || null
let FILTERS = null
if (FILTERS_ARG) {
  FILTERS = FILTERS_ARG.split(',').map(s => s.trim()).filter(Boolean).map(s => s.toLowerCase())
} 

function findItalicFiles(dir, filters) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  if (filters && filters.length) console.log('Using filename filters:', filters.join(', '))
  for (const e of entries) {
    if (e.isDirectory()) {
      const sub = path.join(dir, e.name)
      const subfiles = fs.readdirSync(sub)
      for (const f of subfiles) {
        const fnameLower = f.toLowerCase()
        if (!fnameLower.endsWith('.otf')) continue
        const label = `${e.name}/${f}`
        const labelLower = label.toLowerCase()
        let matched = false
        if (filters && filters.length) {
          for (const fl of filters) {
            if (fnameLower.includes(fl) || labelLower.includes(fl)) { matched = true; break }
          }
        } else {
          // default behaviour: include italic-named OTFs
          if (/italic/i.test(f)) matched = true
        }
        if (matched) files.push({ file: path.join(sub, f), label })
      }
    }
  }
  return files
}

function computePathBounds(pathObj) {
  // pathObj.commands is an array of commands with coordinates
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const cmd of pathObj.commands) {
    if (cmd.x != null && !Number.isNaN(cmd.x)) { minX = Math.min(minX, cmd.x); maxX = Math.max(maxX, cmd.x) }
    if (cmd.x1 != null && !Number.isNaN(cmd.x1)) { minX = Math.min(minX, cmd.x1); maxX = Math.max(maxX, cmd.x1) }
    if (cmd.x2 != null && !Number.isNaN(cmd.x2)) { minX = Math.min(minX, cmd.x2); maxX = Math.max(maxX, cmd.x2) }
    if (cmd.y != null && !Number.isNaN(cmd.y)) { minY = Math.min(minY, cmd.y); maxY = Math.max(maxY, cmd.y) }
    if (cmd.y1 != null && !Number.isNaN(cmd.y1)) { minY = Math.min(minY, cmd.y1); maxY = Math.max(maxY, cmd.y1) }
    if (cmd.y2 != null && !Number.isNaN(cmd.y2)) { minY = Math.min(minY, cmd.y2); maxY = Math.max(maxY, cmd.y2) }
  }
  if (!isFinite(minX)) { return null }
  return { minX, minY, maxX, maxY }
} 

function unionBounds(boundsList) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const b of boundsList) {
    if (!b) continue
    minX = Math.min(minX, b.minX)
    minY = Math.min(minY, b.minY)
    maxX = Math.max(maxX, b.maxX)
    maxY = Math.max(maxY, b.maxY)
  }
  if (!isFinite(minX)) return null
  return { minX, minY, maxX, maxY }
}

function hsla(h, s, l, a) {
  return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${a})`
}

async function main() {
  if (!fs.existsSync(VERSIONS_OUT)) {
    console.error('Versions dir not found:', VERSIONS_OUT)
    process.exit(2)
  }

  const files = findItalicFiles(VERSIONS_OUT, FILTERS)
  if (files.length === 0) {
    if (FILTERS && FILTERS.length) console.error('No OTF files matched filters in', VERSIONS_OUT, 'filters:', FILTERS.join(', '))
    else console.error('No italic OTF files found in', VERSIONS_OUT)
    process.exit(0)
  }
  console.log(`Found ${files.length} OTF files to inspect${FILTERS ? ` (filters: ${FILTERS_ARG})` : ''}`)


  const entries = []

  for (const item of files) {
    try {
      const buffer = fs.readFileSync(item.file)
      const font = opentype.parse(buffer.buffer)
      // support passing a character (e.g. 'g'); charToGlyph handles one character
      const glyph = font.charToGlyph(GLYPH)
      if (!glyph) {
        console.error(`No glyph for '${GLYPH}' found in`, item.file)
        continue
      }
      const unitsPerEm = font.unitsPerEm || 1000
      const ascender = font.ascender || Math.round(unitsPerEm * 0.8)
      // store font and glyph info; path will be generated later after we know target UPM
      entries.push({ file: item.file, label: item.label, glyph, unitsPerEm, ascender })
    } catch (err) {
      console.error('Error reading/parsing', item.file, err.message)
    }
  }

  if (entries.length === 0) {
    console.error('No valid glyph entries found; exiting')
    process.exit(0)
  }

  // Scaling: either scale each glyph so its bbox height == max bbox height (default),
  // or scale to a numeric TARGET_UPM if given (SCALE_ARG was numeric).

  if (USE_BBOX) {
    // first compute native bbox heights (using font's units as the path size)
    for (const e of entries) {
      // use baseline at y=0 so bbox heights are baseline-relative
      const p_native = e.glyph.getPath(0, 0, e.unitsPerEm)
      const b = computePathBounds(p_native)
      if (!b) {
        console.error(`Empty native bbox for '${GLYPH}' in`, e.file)
        e.invalid = true
        continue
      }
      e.nativeBounds = b
      e.nativeHeight = b.maxY - b.minY
    }

    const maxHeight = Math.max(...entries.filter(e => !e.invalid).map(e => e.nativeHeight))
    if (!isFinite(maxHeight) || maxHeight <= 0) {
      console.error('Failed to determine max glyph bbox height; exiting')
      process.exit(1)
    }

    // generate scaled paths so each glyph's bbox height equals maxHeight
    for (const e of entries) {
      if (e.invalid) continue
      const scale = maxHeight / e.nativeHeight
      const targetFontSize = e.unitsPerEm * scale
      // draw using baseline y=0 so baseline is consistent across fonts
      const p = e.glyph.getPath(0, 0, targetFontSize)
      let bounds = computePathBounds(p)
      if (!bounds) {
        console.error(`Empty scaled path for '${GLYPH}' in`, e.file)
        e.invalid = true
        continue
      }
      // center horizontally: shift path so its center X is at 0
      const cx = (bounds.minX + bounds.maxX) / 2
      for (const cmd of p.commands) {
        if (cmd.x != null) cmd.x -= cx
        if (cmd.x1 != null) cmd.x1 -= cx
        if (cmd.x2 != null) cmd.x2 -= cx
      }
      bounds = { minX: bounds.minX - cx, maxX: bounds.maxX - cx, minY: bounds.minY, maxY: bounds.maxY }
      e.pathD = p.toPathData(2)
      e.bounds = bounds
      e.scaledTo = `bbox_max(${Math.round(maxHeight)})`
    }
  } else {
    // numeric TARGET_UPM provided: behave like before (scale by UPM)
    for (const e of entries) {
      const targetFontSize = TARGET_UPM
      const scale = targetFontSize / e.unitsPerEm
      // draw using baseline y=0 so baseline is consistent across fonts
      const p = e.glyph.getPath(0, 0, targetFontSize)
      let bounds = computePathBounds(p)
      if (!bounds) {
        console.error(`Empty path for '${GLYPH}' in`, e.file)
        e.invalid = true
        continue
      }
      // center horizontally: shift path so its center X is at 0
      const cx = (bounds.minX + bounds.maxX) / 2
      for (const cmd of p.commands) {
        if (cmd.x != null) cmd.x -= cx
        if (cmd.x1 != null) cmd.x1 -= cx
        if (cmd.x2 != null) cmd.x2 -= cx
      }
      bounds = { minX: bounds.minX - cx, maxX: bounds.maxX - cx, minY: bounds.minY, maxY: bounds.maxY }
      e.pathD = p.toPathData(2)
      e.bounds = bounds
      e.scaledTo = `UPM(${TARGET_UPM})`
    }
  }

  // filter out invalid entries
  const validEntries = entries.filter(e => !e.invalid)
  if (validEntries.length === 0) {
    console.error('No valid scaled glyphs to render; exiting')
    process.exit(0)
  }

  // compute overall bounds and padding
  const allBounds = validEntries.map(e => e.bounds)
  const u = unionBounds(allBounds)
  const pad = Math.max((u.maxX - u.minX), (u.maxY - u.minY)) * 0.05 + 10
  const viewMinX = Math.floor(u.minX - pad)
  const viewMinY = Math.floor(u.minY - pad)
  const viewW = Math.ceil(u.maxX - u.minX + pad * 2)
  const viewH = Math.ceil(u.maxY - u.minY + pad * 2)

  // generate colors
  const n = validEntries.length
  const colors = []
  for (let i = 0; i < n; i++) colors.push(hsla((i * 360 / n), 70, 40, 0.5))

  // build svg content (overlay paths, later ones on top)
  let svgParts = []
  svgParts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewMinX} ${viewMinY} ${viewW} ${viewH}" preserveAspectRatio="xMidYMid meet" style="max-width:100%; height:auto; display:block;">`)
  svgParts.push(`<rect x="${viewMinX}" y="${viewMinY}" width="${viewW}" height="${viewH}" fill="#fff"/>`)
  // baseline at y=0 for verification
  svgParts.push(`<line x1="${viewMinX}" y1="0" x2="${viewMinX + viewW}" y2="0" stroke="#000" stroke-width="0.5" opacity="0.6" />`)

  validEntries.forEach((e, idx) => {
    svgParts.push(`<path d="${e.pathD}" fill="none" stroke="${colors[idx]}" stroke-width="1pt" stroke-linejoin="round" stroke-linecap="round" />`)
  })

  svgParts.push(`</svg>`)

  // legend
  let legendParts = []
  legendParts.push('<div style="font-family: sans-serif; margin-top: 12px">')
  legendParts.push(`<h3>Overlay of '${GLYPH}' from italic fonts (scaled: ${USE_BBOX ? "bbox-max-height" : `UPM ${TARGET_UPM}`}) — horizontally centered; baseline aligned at y=0</h3>`)
  if (FILTERS && FILTERS.length) legendParts.push(`<div>Filters: ${FILTERS_ARG}</div>`)
  legendParts.push('<ul>')
  validEntries.forEach((e, idx) => {
    legendParts.push(`<li><span style="display:inline-block;width:14px;height:10px;background:${colors[idx]};opacity:0.9;margin-right:6px;border:1px solid #000"></span>${e.label}</li>`)
  })
  legendParts.push('</ul>')
  legendParts.push('</div>')

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${GLYPH} Compare</title></head><body style="background:#fff;color:#000;font-family: sans-serif;">
<div>
${svgParts.join('\n')}
${legendParts.join('\n')}
</div>
</body></html>`

  fs.writeFileSync(OUT_HTML, html)
  console.log('Wrote', OUT_HTML, 'with', validEntries.length, 'entries')
}

main().catch(err => { console.error(err); process.exit(1) })
