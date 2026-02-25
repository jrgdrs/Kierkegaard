const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

async function countKerningPairs(fontPath) {
    try {
        if (!fs.existsSync(fontPath)) {
            throw new Error("Font file not found.");
        }

        const font = await opentype.load(fontPath);

        let kerningCount = 0;

        // Method 1: Check legacy 'kern' table
        if (font.tables.kern && font.tables.kern.pairs) {
            kerningCount = Object.keys(font.tables.kern.pairs).length;
        }

        // Method 2: Fallback – brute force check (for GPOS-based kerning)
        if (kerningCount === 0) {
            console.log("No legacy kern table found. Scanning glyph pairs...");

            const glyphs = font.glyphs.glyphs;
            const glyphIndexes = Object.keys(glyphs).map(Number);

            for (let i = 0; i < glyphIndexes.length; i++) {
                for (let j = 0; j < glyphIndexes.length; j++) {
                    const left = glyphIndexes[i];
                    const right = glyphIndexes[j];

                    const value = font.getKerningValue(
                        font.glyphs.get(left),
                        font.glyphs.get(right)
                    );

                    if (value !== 0) {
                        kerningCount++;
                    }
                }
            }
        }

        console.log(`Font: ${path.basename(fontPath)}`);
        console.log(`Kerning pairs found: ${kerningCount}`);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Usage from CLI
const fontFile = process.argv[2];

if (!fontFile) {
    console.log("Usage: node analyze-kerning.js <font-file.ttf|otf>");
    process.exit(1);
}

countKerningPairs(fontFile);