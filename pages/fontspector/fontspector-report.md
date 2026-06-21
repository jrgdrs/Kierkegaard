## FontSpector report

fontspector version: 1.5.2






## Check results




<details><summary>[11] fonts/variable/Kierkegaard[opsz,wght].ttf</summary>
<div>


<details>
    <summary>⚠️ <b>WARN</b> Axes and named instances fall within correct ranges? (opentype/fvar/regular_coords_correct)</summary>
    <div>








- ⚠️ **WARN** Regular instance has opsz coordinate of 9, expected between 10 and 16 [code: opsz]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Checking unitsPerEm value is reasonable. (opentype/unitsperem)</summary>
    <div>








- ⚠️ **WARN** In order to optimize performance on some legacy renderers, the value of unitsPerEm at the head table should ideally be a power of 2 between 16 to 16384. And values of 1000 and 2000 are also common and may be just fine as well. But we got 1156 instead. [code: suboptimal]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check if each glyph has the recommended amount of contours. (contour_count)</summary>
    <div>








- ⚠️ **WARN** This check inspects the glyph outlines and detects the total number of contours in each of them. The expected values are
     inferred from the typical amounts of contours observed in a
     large collection of reference font families. The divergences
     listed below may simply indicate a significantly different
     design on some of your glyphs. On the other hand, some of these
     may flag actual bugs in the font such as glyphs mapped to an
     incorrect codepoint. Please consider reviewing the design and
     codepoint assignment of these to make sure they are correct.


    The following glyphs do not have the recommended number of contours:
* uni0190 (U+0190): found 2, expected one of: {1}
* uni025B.sc (unencoded): found 2, expected one of: {1}
* pi.sc (unencoded): found 3, expected one of: {1}
* three.osf (unencoded): found 2, expected one of: {1, 3}
* two.tosf (unencoded): found 2, expected one of: {1}
* semicolon (U+003B): found 3, expected one of: {6, 2}
* quotedblbase (U+201E): found 4, expected one of: {2, 6}
* quotedblleft (U+201C): found 4, expected one of: {6, 2}
* quotedblright (U+201D): found 4, expected one of: {2, 6}
* lozenge (U+25CA): found 1, expected one of: {2} [code: contour-count]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Are there caret positions declared for every ligature? (ligature_carets)</summary>
    <div>








- ⚠️ **WARN** This font lacks caret position values for ligature glyphs on its GDEF table. [code: lacks-caret-pos]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check font contains no unreachable glyphs (unreachable_glyphs)</summary>
    <div>








- ⚠️ **WARN** The following glyphs could not be reached by codepoint or substitution rules:

* uni004A0301
* A.ordn
* B.ordn
* C.ordn
* D.ordn
* E.ordn
* Eacute.ordn
* Egrave.ordn
* F.ordn
* G.ordn
* H.ordn
* I.ordn
* J.ordn
* K.ordn
* L.ordn
* M.ordn
* N.ordn
* O.ordn
* P.ordn
* Q.ordn
* R.ordn
* S.ordn
* T.ordn
* U.ordn
* V.ordn
* W.ordn
* X.ordn
* Y.ordn
* Z.ordn
* uni006A0301
* d.alt
* a.ordn
* b.ordn
* c.ordn
* d.ordn
* e.ordn
* eacute.ordn
* egrave.ordn
* f.ordn
* g.ordn
* h.ordn
* j.ordn
* k.ordn
* l.ordn
* m.ordn
* n.ordn
* o.ordn
* p.ordn
* q.ordn
* r.ordn
* s.ordn
* t.ordn
* u.ordn
* v.ordn
* w.ordn
* x.ordn
* y.ordn
* z.ordn
* i..ordn
* uni0327.uc
* uni0328.uc
* tilde.
* dieresis.old
* acute.old
* tilde.old
* dieresis.comb.old
* wine
* placeholder.temp [code: unreachable-glyphs]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Shapes languages in all GF glyphsets. (googlefonts/glyphsets/shape_languages)</summary>
    <div>








- ⚠️ **WARN** Warning language shaping:

| Message                                                           | Languages                    |
|-------------------------------------------------------------------|------------------------------|
| Auxiliary orthography codepoints:                                 | * en_Latn (English)          |
|   The following auxiliary characters are missing from the font: Ĕ |                              |
|   The following auxiliary characters are missing from the font: Ĭ |                              |
|   The following auxiliary characters are missing from the font: Ŏ |                              |
|   The following auxiliary characters are missing from the font: ĕ |                              |
|   The following auxiliary characters are missing from the font: ĭ |                              |
|   The following auxiliary characters are missing from the font: ŏ |                              |
|   The following auxiliary characters are missing from the font: ʻ |                              |
| Auxiliary orthography codepoints:                                 | * fr_Latn (French)           |
|   The following auxiliary characters are missing from the font: Ǔ |                              |
|   The following auxiliary characters are missing from the font: ſ |                              |
|   The following auxiliary characters are missing from the font: ǔ |                              |
| Auxiliary orthography codepoints:                                 | * da_Latn (Danish)           |
|   The following auxiliary characters are missing from the font: Ǿ |                              |
|   The following auxiliary characters are missing from the font: ǿ |                              |
| Auxiliary orthography codepoints:                                 | * de_Latn (German)           |
|   The following auxiliary characters are missing from the font: Ĕ |                              |
|   The following auxiliary characters are missing from the font: Ĭ |                              |
|   The following auxiliary characters are missing from the font: Ŏ |                              |
|   The following auxiliary characters are missing from the font: ĕ |                              |
|   The following auxiliary characters are missing from the font: ĭ |                              |
|   The following auxiliary characters are missing from the font: ŏ |                              |
|   The following auxiliary characters are missing from the font: ſ |                              |
| Auxiliary orthography codepoints:                                 | * cs_Latn (Czech)            |
|   The following auxiliary characters are missing from the font: Ĕ | * cy_Latn (Welsh)            |
|   The following auxiliary characters are missing from the font: Ĭ | * es_Latn (Spanish)          |
|   The following auxiliary characters are missing from the font: Ŏ | * hu_Latn (Hungarian)        |
|   The following auxiliary characters are missing from the font: ĕ | * pt_Latn (Portuguese)       |
|   The following auxiliary characters are missing from the font: ĭ | * sk_Latn (Slovak)           |
|   The following auxiliary characters are missing from the font: ŏ | * tr_Latn (Turkish)          |
| Auxiliary orthography codepoints:                                 | * fi_Latn (Finnish)          |
|   The following auxiliary characters are missing from the font: Ǧ |                              |
|   The following auxiliary characters are missing from the font: Ǥ |                              |
|   The following auxiliary characters are missing from the font: Ȟ |                              |
|   The following auxiliary characters are missing from the font: Ǩ |                              |
|   The following auxiliary characters are missing from the font: Ŧ |                              |
|   The following auxiliary characters are missing from the font: Ʒ |                              |
|   The following auxiliary characters are missing from the font: Ǯ |                              |
|   The following auxiliary characters are missing from the font: ǧ |                              |
|   The following auxiliary characters are missing from the font: ǥ |                              |
|   The following auxiliary characters are missing from the font: ȟ |                              |
|   The following auxiliary characters are missing from the font: ǩ |                              |
|   The following auxiliary characters are missing from the font: ŧ |                              |
|   The following auxiliary characters are missing from the font: ʒ |                              |
|   The following auxiliary characters are missing from the font: ǯ |                              |
| Auxiliary orthography codepoints:                                 | * ca_Latn (Catalan)          |
|   The following auxiliary characters are missing from the font: Ĕ |                              |
|   The following auxiliary characters are missing from the font: Ĭ |                              |
|   The following auxiliary characters are missing from the font: Ŀ |                              |
|   The following auxiliary characters are missing from the font: Ŏ |                              |
|   The following auxiliary characters are missing from the font: ĕ |                              |
|   The following auxiliary characters are missing from the font: ĭ |                              |
|   The following auxiliary characters are missing from the font: ŀ |                              |
|   The following auxiliary characters are missing from the font: ŏ |                              |
| Auxiliary orthography codepoints:                                 | * nb_Latn (Norwegian Bokmål) |
|   The following auxiliary characters are missing from the font: Ǎ |                              |
|   The following auxiliary characters are missing from the font: Ŧ |                              |
|   The following auxiliary characters are missing from the font: ǎ |                              |
|   The following auxiliary characters are missing from the font: ŧ |                              | [code: warning-language-shaping]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Font has correct separator glyphs? (googlefonts/separator_glyphs)</summary>
    <div>








- ⚠️ **WARN** The following separator glyphs are missing:

* U+2028
* U+2029 [code: missing-separator-glyphs]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Ensure soft_dotted characters lose their dot when combined with marks that
replace the dot. (soft_dotted)</summary>
    <div>








- ⚠️ **WARN** The dot of soft dotted characters used in orthographies _must_ disappear in the following strings:

* ị̀
* ị̄
* ị́
* ị̃
* ị̂
* į̀
* į̄
* į́
* į̌
* į̃
* į̂The dot of soft dotted characters _should_ disappear in other cases, for example:

* ị̈
* ị̌
* ị̉
* ị̇
* ị̆
* ị̋
* ị̊
* ị̒
* į̈
* į̉
* į̇
* į̆
* į̋
* į̊
* į̒ [code: soft-dotted]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check the direction of the outermost contour in each glyph (outline_direction)</summary>
    <div>








- ⚠️ **WARN** The following glyphs have a counter-clockwise outer contour:

* asterisk (U+002A) has a counter-clockwise outer contour
* asterisk (U+002A) has a counter-clockwise outer contour
* lozenge (U+25CA) has a counter-clockwise outer contour [code: ccw-outer-contour]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check there are no overlapping path segments (overlapping_path_segments)</summary>
    <div>








- ⚠️ **WARN** The following glyphs have overlapping path segments:

* f_f_i: Line(Line { p0: (871.0, 510.0), p1: (871.0, 444.0) }) has the same coordinates as a previous segment.
* eight (U+0038): Line(Line { p0: (297.0, 27.0), p1: (297.0, -16.0) }) has the same coordinates as a previous segment.
* eight.lf: Line(Line { p0: (294.0, 27.0), p1: (294.0, -16.0) }) has the same coordinates as a previous segment.
* eight.osf: Line(Line { p0: (253.0, 31.0), p1: (253.0, -12.0) }) has the same coordinates as a previous segment.
* eight.sc: Line(Line { p0: (267.0, 25.0), p1: (267.0, -12.0) }) has the same coordinates as a previous segment.
* eight.tf: Line(Line { p0: (294.0, 27.0), p1: (294.0, -16.0) }) has the same coordinates as a previous segment.
* eight.tosf: Line(Line { p0: (301.0, 31.0), p1: (301.0, -12.0) }) has the same coordinates as a previous segment.
* uni20BC (U+20BC): Line(Line { p0: (325.0, 577.0), p1: (365.0, 617.0) }) has the same coordinates as a previous segment. [code: overlapping-path-segments]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Ensure fonts have ScriptLangTags declared on the 'meta' table. (googlefonts/meta/script_lang_tags)</summary>
    <div>








- ⚠️ **WARN** This font file does not have a 'meta' table. [code: lacks-meta-table]
  
  

</div>
</details>


</div>
</details>


<details><summary>[1] fonts/variable</summary>
<div>


<details>
    <summary>⚠️ <b>WARN</b> Check for codepoints not covered by METADATA subsets. (googlefonts/metadata/unreachable_subsetting)</summary>
    <div>








- ⚠️ **WARN** fonts/variable/Kierkegaard[opsz,wght].ttf: The following codepoints supported by the font are not covered by any subsets defined in the font's metadata file, and will never be served. You can solve this by either manually adding additional subset declarations to METADATA.pb, or by editing the glyphset definitions.

* U+02D8 BREVE: try adding one of: yi, canadian-aboriginal
* U+02D9 DOT ABOVE: try adding one of: yi, canadian-aboriginal
* U+02DB OGONEK: try adding one of: canadian-aboriginal, yi
* U+0302 COMBINING CIRCUMFLEX ACCENT: try adding one of: coptic, cherokee, math, tifinagh
* U+0306 COMBINING BREVE: try adding one of: tifinagh, old-permic
* U+0307 COMBINING DOT ABOVE: try adding one of: todhri, math, syriac, tai-le, tifinagh, old-permic, coptic, duployan, canadian-aboriginal, hebrew, malayalam
* U+030A COMBINING RING ABOVE: try adding one of: duployan, syriac
* U+030B COMBINING DOUBLE ACUTE ACCENT: try adding one of: osage, cherokee
* U+030C COMBINING CARON: try adding one of: cherokee, tai-le
* U+0312 COMBINING TURNED COMMA ABOVE: try adding math
* U+0326 COMBINING COMMA BELOW: try adding math
* U+0327 COMBINING CEDILLA: try adding math
* U+03C0 GREEK SMALL LETTER PI: try adding one of: math, yi, greek
* U+0E3F THAI CURRENCY SYMBOL BAHT: try adding thai
* U+2000 EN QUAD: try adding symbols2
* U+2001 EM QUAD: try adding symbols2
* U+2003 EM SPACE: try adding nushu
* U+2004 THREE-PER-EM SPACE: try adding symbols2
* U+2005 FOUR-PER-EM SPACE: try adding symbols2
* U+2006 SIX-PER-EM SPACE: try adding symbols2
* U+2007 FIGURE SPACE: try adding symbols2
* U+2008 PUNCTUATION SPACE: try adding symbols2
* U+200A HAIR SPACE: try adding symbols2
* U+200C ZERO WIDTH NON-JOINER: try adding one of: rejang, kaithi, tifinagh, new-tai-lue, lepcha, khojki, syriac, tagalog, buhid, syloti-nagri, javanese, nko, duployan, oriya, malayalam, hanunoo, devanagari, arabic, bhaiksuki, sharada, tagbanwa, sogdian, cham, khmer, khudawadi, grantha, hebrew, kayah-li, zanabazar-square, tai-tham, avestan, meetei-mayek, chakma, mahajani, hanifi-rohingya, sundanese, yi, batak, lao, thaana, modi, kharoshthi, thai, takri, tirhuta, psalter-pahlavi, balinese, buginese, kannada, telugu, mandaic, warang-citi, pahawh-hmong, mongolian, gunjala-gondi, masaram-gondi, gurmukhi, dogra, siddham, tibetan, tai-le, phags-pa, myanmar, bengali, brahmi, newa, gujarati, hatran, sinhala, saurashtra, limbu, tai-viet, tamil, manichaean
* U+200D ZERO WIDTH JOINER: try adding one of: tibetan, myanmar, sogdian, khudawadi, sundanese, gurmukhi, new-tai-lue, saurashtra, kayah-li, brahmi, newa, modi, rejang, mongolian, hanunoo, sharada, siddham, hanifi-rohingya, bhaiksuki, tai-tham, takri, kannada, hebrew, mahajani, tifinagh, tai-le, chakma, gujarati, old-hungarian, sinhala, tagalog, telugu, avestan, limbu, masaram-gondi, thai, tagbanwa, zanabazar-square, thaana, syloti-nagri, yi, lao, pahawh-hmong, gunjala-gondi, javanese, psalter-pahlavi, devanagari, oriya, tirhuta, khojki, malayalam, phags-pa, tamil, arabic, meetei-mayek, khmer, lepcha, manichaean, syriac, bengali, grantha, kharoshthi, nko, duployan, buhid, balinese, batak, buginese, cham, tai-viet, dogra, warang-citi, kaithi, mandaic
* U+200E LEFT-TO-RIGHT MARK: try adding one of: syriac, hebrew, arabic, nko, phags-pa, thaana
* U+200F RIGHT-TO-LEFT MARK: try adding one of: syriac, thaana, hebrew, phags-pa, nko
* U+2016 DOUBLE VERTICAL LINE: try adding math
* U+2021 DOUBLE DAGGER: try adding adlam
* U+202F NARROW NO-BREAK SPACE: try adding one of: mongolian, phags-pa, yi
* U+2030 PER MILLE SIGN: try adding adlam
* U+205F MEDIUM MATHEMATICAL SPACE: try adding math
* U+2070 SUPERSCRIPT ZERO: try adding math
* U+2074 SUPERSCRIPT FOUR: try adding math
* U+2075 SUPERSCRIPT FIVE: try adding math
* U+2076 SUPERSCRIPT SIX: try adding math
* U+2077 SUPERSCRIPT SEVEN: try adding math
* U+2078 SUPERSCRIPT EIGHT: try adding math
* U+2079 SUPERSCRIPT NINE: try adding math
* U+2080 SUBSCRIPT ZERO: try adding math
* U+2081 SUBSCRIPT ONE: try adding math
* U+2082 SUBSCRIPT TWO: try adding math
* U+2083 SUBSCRIPT THREE: try adding math
* U+2084 SUBSCRIPT FOUR: try adding math
* U+2085 SUBSCRIPT FIVE: try adding math
* U+2086 SUBSCRIPT SIX: try adding math
* U+2087 SUBSCRIPT SEVEN: try adding math
* U+2088 SUBSCRIPT EIGHT: try adding math
* U+2089 SUBSCRIPT NINE: try adding math
* U+2116 NUMERO SIGN: try adding cyrillic
* U+2126 OHM SIGN: try adding math
* U+212E ESTIMATED SYMBOL: try adding math
* U+2150 VULGAR FRACTION ONE SEVENTH: try adding symbols
* U+2151 VULGAR FRACTION ONE NINTH: try adding symbols
* U+2152 VULGAR FRACTION ONE TENTH: try adding symbols
* U+2153 VULGAR FRACTION ONE THIRD: try adding symbols
* U+2154 VULGAR FRACTION TWO THIRDS: try adding symbols
* U+2155 VULGAR FRACTION ONE FIFTH: try adding symbols
* U+2156 VULGAR FRACTION TWO FIFTHS: try adding symbols
* U+2157 VULGAR FRACTION THREE FIFTHS: try adding symbols
* U+2158 VULGAR FRACTION FOUR FIFTHS: try adding symbols
* U+2159 VULGAR FRACTION ONE SIXTH: try adding symbols
* U+215A VULGAR FRACTION FIVE SIXTHS: try adding symbols
* U+215B VULGAR FRACTION ONE EIGHTH: try adding symbols
* U+215C VULGAR FRACTION THREE EIGHTHS: try adding symbols
* U+215D VULGAR FRACTION FIVE EIGHTHS: try adding symbols
* U+215E VULGAR FRACTION SEVEN EIGHTHS: try adding symbols
* U+215F FRACTION NUMERATOR ONE: try adding symbols
* U+2189 VULGAR FRACTION ZERO THIRDS: try adding symbols
* U+2190 LEFTWARDS ARROW: try adding one of: math, symbols
* U+2192 RIGHTWARDS ARROW: try adding one of: symbols, math
* U+2194 LEFT RIGHT ARROW: try adding one of: math, symbols
* U+2195 UP DOWN ARROW: try adding one of: math, symbols
* U+2196 NORTH WEST ARROW: try adding one of: symbols, math
* U+2197 NORTH EAST ARROW: try adding one of: math, symbols
* U+2198 SOUTH EAST ARROW: try adding one of: symbols, math
* U+2199 SOUTH WEST ARROW: try adding one of: math, symbols
* U+2202 PARTIAL DIFFERENTIAL: try adding math
* U+2205 EMPTY SET: try adding math
* U+2206 INCREMENT: try adding math
* U+220F N-ARY PRODUCT: try adding math
* U+2211 N-ARY SUMMATION: try adding math
* U+221A SQUARE ROOT: try adding math
* U+221E INFINITY: try adding math
* U+222B INTEGRAL: try adding math
* U+2248 ALMOST EQUAL TO: try adding math
* U+2260 NOT EQUAL TO: try adding math
* U+2264 LESS-THAN OR EQUAL TO: try adding math
* U+2265 GREATER-THAN OR EQUAL TO: try adding math
* U+25A0 BLACK SQUARE: try adding symbols
* U+25A1 WHITE SQUARE: try adding symbols
* U+25AA BLACK SMALL SQUARE: try adding symbols
* U+25AB WHITE SMALL SQUARE: try adding symbols
* U+25B2 BLACK UP-POINTING TRIANGLE: try adding symbols
* U+25B3 WHITE UP-POINTING TRIANGLE: try adding one of: symbols, math
* U+25B4 BLACK UP-POINTING SMALL TRIANGLE: try adding symbols
* U+25B5 WHITE UP-POINTING SMALL TRIANGLE: try adding symbols
* U+25B6 BLACK RIGHT-POINTING TRIANGLE: try adding symbols
* U+25B7 WHITE RIGHT-POINTING TRIANGLE: try adding one of: symbols, math
* U+25B8 BLACK RIGHT-POINTING SMALL TRIANGLE: try adding symbols
* U+25B9 WHITE RIGHT-POINTING SMALL TRIANGLE: try adding symbols
* U+25BC BLACK DOWN-POINTING TRIANGLE: try adding symbols
* U+25BD WHITE DOWN-POINTING TRIANGLE: try adding one of: symbols, math
* U+25BE BLACK DOWN-POINTING SMALL TRIANGLE: try adding symbols
* U+25BF WHITE DOWN-POINTING SMALL TRIANGLE: try adding symbols
* U+25C0 BLACK LEFT-POINTING TRIANGLE: try adding symbols
* U+25C1 WHITE LEFT-POINTING TRIANGLE: try adding one of: symbols, math
* U+25C2 BLACK LEFT-POINTING SMALL TRIANGLE: try adding symbols
* U+25C3 WHITE LEFT-POINTING SMALL TRIANGLE: try adding symbols
* U+25C6 BLACK DIAMOND: try adding symbols
* U+25C7 WHITE DIAMOND: try adding symbols
* U+25CA LOZENGE: try adding one of: symbols, math
* U+25CB WHITE CIRCLE: try adding symbols
* U+25CC DOTTED CIRCLE: try adding one of: mende-kikakui, hanunoo, phags-pa, balinese, kharoshthi, tagalog, tai-viet, tifinagh, wancho, marchen, chakma, gurmukhi, sogdian, soyombo, new-tai-lue, masaram-gondi, buhid, syriac, nko, tamil, syloti-nagri, cham, limbu, hebrew, mandaic, miao, symbols, tirhuta, batak, sharada, tibetan, bhaiksuki, elbasan, buginese, oriya, gujarati, kayah-li, ahom, zanabazar-square, duployan, caucasian-albanian, khojki, thaana, sundanese, osage, pahawh-hmong, mongolian, old-permic, warang-citi, canadian-aboriginal, saurashtra, myanmar, meetei-mayek, armenian, adlam, math, music, brahmi, kaithi, tagbanwa, tai-tham, telugu, manichaean, tai-le, dogra, mahajani, bassa-vah, hanifi-rohingya, coptic, sinhala, newa, thai, grantha, psalter-pahlavi, lao, modi, rejang, bengali, siddham, yi, gunjala-gondi, khudawadi, malayalam, devanagari, khmer, javanese, kannada, lepcha, takri
* U+25CF BLACK CIRCLE: try adding symbols
* U+25E6 WHITE BULLET: try adding symbols
* U+27E8 MATHEMATICAL LEFT ANGLE BRACKET: try adding math
* U+27E9 MATHEMATICAL RIGHT ANGLE BRACKET: try adding math

Or you can add the above codepoints to one of the subsets supported by the font: cyrillic-ext, latin-ext, latin, vietnamese [code: unreachable-subsetting]
  
  


- ⚠️ **WARN** fonts/variable/Kierkegaard-Italic[opsz,wght].ttf: The following codepoints supported by the font are not covered by any subsets defined in the font's metadata file, and will never be served. You can solve this by either manually adding additional subset declarations to METADATA.pb, or by editing the glyphset definitions.

* U+02D8 BREVE: try adding one of: yi, canadian-aboriginal
* U+02D9 DOT ABOVE: try adding one of: yi, canadian-aboriginal
* U+02DB OGONEK: try adding one of: canadian-aboriginal, yi
* U+0302 COMBINING CIRCUMFLEX ACCENT: try adding one of: coptic, cherokee, math, tifinagh
* U+0306 COMBINING BREVE: try adding one of: tifinagh, old-permic
* U+0307 COMBINING DOT ABOVE: try adding one of: todhri, math, syriac, tai-le, tifinagh, old-permic, coptic, duployan, canadian-aboriginal, hebrew, malayalam
* U+030A COMBINING RING ABOVE: try adding one of: duployan, syriac
* U+030B COMBINING DOUBLE ACUTE ACCENT: try adding one of: osage, cherokee
* U+030C COMBINING CARON: try adding one of: cherokee, tai-le
* U+0312 COMBINING TURNED COMMA ABOVE: try adding math
* U+0326 COMBINING COMMA BELOW: try adding math
* U+0327 COMBINING CEDILLA: try adding math
* U+03C0 GREEK SMALL LETTER PI: try adding one of: math, yi, greek
* U+0E3F THAI CURRENCY SYMBOL BAHT: try adding thai
* U+2000 EN QUAD: try adding symbols2
* U+2001 EM QUAD: try adding symbols2
* U+2003 EM SPACE: try adding nushu
* U+2004 THREE-PER-EM SPACE: try adding symbols2
* U+2005 FOUR-PER-EM SPACE: try adding symbols2
* U+2006 SIX-PER-EM SPACE: try adding symbols2
* U+2007 FIGURE SPACE: try adding symbols2
* U+2008 PUNCTUATION SPACE: try adding symbols2
* U+200A HAIR SPACE: try adding symbols2
* U+200C ZERO WIDTH NON-JOINER: try adding one of: rejang, kaithi, tifinagh, new-tai-lue, lepcha, khojki, syriac, tagalog, buhid, syloti-nagri, javanese, nko, duployan, oriya, malayalam, hanunoo, devanagari, arabic, bhaiksuki, sharada, tagbanwa, sogdian, cham, khmer, khudawadi, grantha, hebrew, kayah-li, zanabazar-square, tai-tham, avestan, meetei-mayek, chakma, mahajani, hanifi-rohingya, sundanese, yi, batak, lao, thaana, modi, kharoshthi, thai, takri, tirhuta, psalter-pahlavi, balinese, buginese, kannada, telugu, mandaic, warang-citi, pahawh-hmong, mongolian, gunjala-gondi, masaram-gondi, gurmukhi, dogra, siddham, tibetan, tai-le, phags-pa, myanmar, bengali, brahmi, newa, gujarati, hatran, sinhala, saurashtra, limbu, tai-viet, tamil, manichaean
* U+200D ZERO WIDTH JOINER: try adding one of: tibetan, myanmar, sogdian, khudawadi, sundanese, gurmukhi, new-tai-lue, saurashtra, kayah-li, brahmi, newa, modi, rejang, mongolian, hanunoo, sharada, siddham, hanifi-rohingya, bhaiksuki, tai-tham, takri, kannada, hebrew, mahajani, tifinagh, tai-le, chakma, gujarati, old-hungarian, sinhala, tagalog, telugu, avestan, limbu, masaram-gondi, thai, tagbanwa, zanabazar-square, thaana, syloti-nagri, yi, lao, pahawh-hmong, gunjala-gondi, javanese, psalter-pahlavi, devanagari, oriya, tirhuta, khojki, malayalam, phags-pa, tamil, arabic, meetei-mayek, khmer, lepcha, manichaean, syriac, bengali, grantha, kharoshthi, nko, duployan, buhid, balinese, batak, buginese, cham, tai-viet, dogra, warang-citi, kaithi, mandaic
* U+200E LEFT-TO-RIGHT MARK: try adding one of: syriac, hebrew, arabic, nko, phags-pa, thaana
* U+200F RIGHT-TO-LEFT MARK: try adding one of: syriac, thaana, hebrew, phags-pa, nko
* U+2016 DOUBLE VERTICAL LINE: try adding math
* U+2021 DOUBLE DAGGER: try adding adlam
* U+202F NARROW NO-BREAK SPACE: try adding one of: mongolian, phags-pa, yi
* U+2030 PER MILLE SIGN: try adding adlam
* U+205F MEDIUM MATHEMATICAL SPACE: try adding math
* U+2070 SUPERSCRIPT ZERO: try adding math
* U+2074 SUPERSCRIPT FOUR: try adding math
* U+2075 SUPERSCRIPT FIVE: try adding math
* U+2076 SUPERSCRIPT SIX: try adding math
* U+2077 SUPERSCRIPT SEVEN: try adding math
* U+2078 SUPERSCRIPT EIGHT: try adding math
* U+2079 SUPERSCRIPT NINE: try adding math
* U+2080 SUBSCRIPT ZERO: try adding math
* U+2081 SUBSCRIPT ONE: try adding math
* U+2082 SUBSCRIPT TWO: try adding math
* U+2083 SUBSCRIPT THREE: try adding math
* U+2084 SUBSCRIPT FOUR: try adding math
* U+2085 SUBSCRIPT FIVE: try adding math
* U+2086 SUBSCRIPT SIX: try adding math
* U+2087 SUBSCRIPT SEVEN: try adding math
* U+2088 SUBSCRIPT EIGHT: try adding math
* U+2089 SUBSCRIPT NINE: try adding math
* U+2116 NUMERO SIGN: try adding cyrillic
* U+2126 OHM SIGN: try adding math
* U+212E ESTIMATED SYMBOL: try adding math
* U+2150 VULGAR FRACTION ONE SEVENTH: try adding symbols
* U+2151 VULGAR FRACTION ONE NINTH: try adding symbols
* U+2152 VULGAR FRACTION ONE TENTH: try adding symbols
* U+2153 VULGAR FRACTION ONE THIRD: try adding symbols
* U+2154 VULGAR FRACTION TWO THIRDS: try adding symbols
* U+2155 VULGAR FRACTION ONE FIFTH: try adding symbols
* U+2156 VULGAR FRACTION TWO FIFTHS: try adding symbols
* U+2157 VULGAR FRACTION THREE FIFTHS: try adding symbols
* U+2158 VULGAR FRACTION FOUR FIFTHS: try adding symbols
* U+2159 VULGAR FRACTION ONE SIXTH: try adding symbols
* U+215A VULGAR FRACTION FIVE SIXTHS: try adding symbols
* U+215B VULGAR FRACTION ONE EIGHTH: try adding symbols
* U+215C VULGAR FRACTION THREE EIGHTHS: try adding symbols
* U+215D VULGAR FRACTION FIVE EIGHTHS: try adding symbols
* U+215E VULGAR FRACTION SEVEN EIGHTHS: try adding symbols
* U+215F FRACTION NUMERATOR ONE: try adding symbols
* U+2189 VULGAR FRACTION ZERO THIRDS: try adding symbols
* U+2190 LEFTWARDS ARROW: try adding one of: math, symbols
* U+2192 RIGHTWARDS ARROW: try adding one of: symbols, math
* U+2194 LEFT RIGHT ARROW: try adding one of: math, symbols
* U+2195 UP DOWN ARROW: try adding one of: math, symbols
* U+2196 NORTH WEST ARROW: try adding one of: symbols, math
* U+2197 NORTH EAST ARROW: try adding one of: math, symbols
* U+2198 SOUTH EAST ARROW: try adding one of: symbols, math
* U+2199 SOUTH WEST ARROW: try adding one of: math, symbols
* U+2202 PARTIAL DIFFERENTIAL: try adding math
* U+2205 EMPTY SET: try adding math
* U+2206 INCREMENT: try adding math
* U+220F N-ARY PRODUCT: try adding math
* U+2211 N-ARY SUMMATION: try adding math
* U+221A SQUARE ROOT: try adding math
* U+221E INFINITY: try adding math
* U+222B INTEGRAL: try adding math
* U+2248 ALMOST EQUAL TO: try adding math
* U+2260 NOT EQUAL TO: try adding math
* U+2264 LESS-THAN OR EQUAL TO: try adding math
* U+2265 GREATER-THAN OR EQUAL TO: try adding math
* U+25A0 BLACK SQUARE: try adding symbols
* U+25A1 WHITE SQUARE: try adding symbols
* U+25AA BLACK SMALL SQUARE: try adding symbols
* U+25AB WHITE SMALL SQUARE: try adding symbols
* U+25B2 BLACK UP-POINTING TRIANGLE: try adding symbols
* U+25B3 WHITE UP-POINTING TRIANGLE: try adding one of: symbols, math
* U+25B4 BLACK UP-POINTING SMALL TRIANGLE: try adding symbols
* U+25B5 WHITE UP-POINTING SMALL TRIANGLE: try adding symbols
* U+25B6 BLACK RIGHT-POINTING TRIANGLE: try adding symbols
* U+25B7 WHITE RIGHT-POINTING TRIANGLE: try adding one of: symbols, math
* U+25B8 BLACK RIGHT-POINTING SMALL TRIANGLE: try adding symbols
* U+25B9 WHITE RIGHT-POINTING SMALL TRIANGLE: try adding symbols
* U+25BC BLACK DOWN-POINTING TRIANGLE: try adding symbols
* U+25BD WHITE DOWN-POINTING TRIANGLE: try adding one of: symbols, math
* U+25BE BLACK DOWN-POINTING SMALL TRIANGLE: try adding symbols
* U+25BF WHITE DOWN-POINTING SMALL TRIANGLE: try adding symbols
* U+25C0 BLACK LEFT-POINTING TRIANGLE: try adding symbols
* U+25C1 WHITE LEFT-POINTING TRIANGLE: try adding one of: symbols, math
* U+25C2 BLACK LEFT-POINTING SMALL TRIANGLE: try adding symbols
* U+25C3 WHITE LEFT-POINTING SMALL TRIANGLE: try adding symbols
* U+25C6 BLACK DIAMOND: try adding symbols
* U+25C7 WHITE DIAMOND: try adding symbols
* U+25CA LOZENGE: try adding one of: symbols, math
* U+25CB WHITE CIRCLE: try adding symbols
* U+25CC DOTTED CIRCLE: try adding one of: mende-kikakui, hanunoo, phags-pa, balinese, kharoshthi, tagalog, tai-viet, tifinagh, wancho, marchen, chakma, gurmukhi, sogdian, soyombo, new-tai-lue, masaram-gondi, buhid, syriac, nko, tamil, syloti-nagri, cham, limbu, hebrew, mandaic, miao, symbols, tirhuta, batak, sharada, tibetan, bhaiksuki, elbasan, buginese, oriya, gujarati, kayah-li, ahom, zanabazar-square, duployan, caucasian-albanian, khojki, thaana, sundanese, osage, pahawh-hmong, mongolian, old-permic, warang-citi, canadian-aboriginal, saurashtra, myanmar, meetei-mayek, armenian, adlam, math, music, brahmi, kaithi, tagbanwa, tai-tham, telugu, manichaean, tai-le, dogra, mahajani, bassa-vah, hanifi-rohingya, coptic, sinhala, newa, thai, grantha, psalter-pahlavi, lao, modi, rejang, bengali, siddham, yi, gunjala-gondi, khudawadi, malayalam, devanagari, khmer, javanese, kannada, lepcha, takri
* U+25CF BLACK CIRCLE: try adding symbols
* U+25E6 WHITE BULLET: try adding symbols
* U+27E8 MATHEMATICAL LEFT ANGLE BRACKET: try adding math
* U+27E9 MATHEMATICAL RIGHT ANGLE BRACKET: try adding math

Or you can add the above codepoints to one of the subsets supported by the font: cyrillic-ext, latin-ext, latin, vietnamese [code: unreachable-subsetting]
  
  

</div>
</details>


</div>
</details>


<details><summary>[12] fonts/variable/Kierkegaard-Italic[opsz,wght].ttf</summary>
<div>


<details>
    <summary>⚠️ <b>WARN</b> Axes and named instances fall within correct ranges? (opentype/fvar/regular_coords_correct)</summary>
    <div>








- ⚠️ **WARN** Regular instance has opsz coordinate of 9, expected between 10 and 16 [code: opsz]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Checking unitsPerEm value is reasonable. (opentype/unitsperem)</summary>
    <div>








- ⚠️ **WARN** In order to optimize performance on some legacy renderers, the value of unitsPerEm at the head table should ideally be a power of 2 between 16 to 16384. And values of 1000 and 2000 are also common and may be just fine as well. But we got 1156 instead. [code: suboptimal]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check if each glyph has the recommended amount of contours. (contour_count)</summary>
    <div>








- ⚠️ **WARN** This check inspects the glyph outlines and detects the total number of contours in each of them. The expected values are
     inferred from the typical amounts of contours observed in a
     large collection of reference font families. The divergences
     listed below may simply indicate a significantly different
     design on some of your glyphs. On the other hand, some of these
     may flag actual bugs in the font such as glyphs mapped to an
     incorrect codepoint. Please consider reviewing the design and
     codepoint assignment of these to make sure they are correct.


    The following glyphs do not have the recommended number of contours:
* uni0190 (U+0190): found 2, expected one of: {1}
* uni025B.sc (unencoded): found 2, expected one of: {1}
* b.sups (unencoded): found 3, expected one of: {2}
* pi.sc (unencoded): found 3, expected one of: {1}
* three.osf (unencoded): found 2, expected one of: {1, 3}
* two.tosf (unencoded): found 2, expected one of: {1}
* semicolon (U+003B): found 3, expected one of: {6, 2}
* quotedblbase (U+201E): found 4, expected one of: {2, 6}
* quotedblleft (U+201C): found 4, expected one of: {6, 2}
* quotedblright (U+201D): found 4, expected one of: {2, 6}
* lozenge (U+25CA): found 1, expected one of: {2} [code: contour-count]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Are there caret positions declared for every ligature? (ligature_carets)</summary>
    <div>








- ⚠️ **WARN** This font lacks caret position values for ligature glyphs on its GDEF table. [code: lacks-caret-pos]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check math signs have the same width. (math_signs_width)</summary>
    <div>








- ⚠️ **WARN** The most common width is 608 among a set of 13  math glyphs.
The following math glyphs have a different width, though:
width=600: equal
width=609: plus [code: width-outliers]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check font contains no unreachable glyphs (unreachable_glyphs)</summary>
    <div>








- ⚠️ **WARN** The following glyphs could not be reached by codepoint or substitution rules:

* uni004A0301
* A.ordn
* B.ordn
* C.ordn
* D.ordn
* E.ordn
* Eacute.ordn
* Egrave.ordn
* F.ordn
* G.ordn
* H.ordn
* I.ordn
* J.ordn
* K.ordn
* L.ordn
* M.ordn
* N.ordn
* O.ordn
* P.ordn
* Q.ordn
* R.ordn
* S.ordn
* T.ordn
* U.ordn
* V.ordn
* W.ordn
* X.ordn
* Y.ordn
* Z.ordn
* uni006A0301
* d.alt
* a.ordn
* b.ordn
* c.ordn
* d.ordn
* e.ordn
* eacute.ordn
* egrave.ordn
* f.ordn
* g.ordn
* h.ordn
* i.ordn
* j.ordn
* k.ordn
* l.ordn
* m.ordn
* n.ordn
* o.ordn
* p.ordn
* q.ordn
* r.ordn
* s.ordn
* t.ordn
* u.ordn
* v.ordn
* w.ordn
* x.ordn
* y.ordn
* z.ordn
* uni0327.uc
* uni0328.uc
* tilde.
* dieresis.old
* acute.old
* tilde.old
* dieresis.comb.old
* wine [code: unreachable-glyphs]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Shapes languages in all GF glyphsets. (googlefonts/glyphsets/shape_languages)</summary>
    <div>








- ⚠️ **WARN** Warning language shaping:

| Message                                                           | Languages                    |
|-------------------------------------------------------------------|------------------------------|
| Auxiliary orthography codepoints:                                 | * en_Latn (English)          |
|   The following auxiliary characters are missing from the font: Ĕ |                              |
|   The following auxiliary characters are missing from the font: Ĭ |                              |
|   The following auxiliary characters are missing from the font: Ŏ |                              |
|   The following auxiliary characters are missing from the font: ĕ |                              |
|   The following auxiliary characters are missing from the font: ĭ |                              |
|   The following auxiliary characters are missing from the font: ŏ |                              |
|   The following auxiliary characters are missing from the font: ʻ |                              |
| Auxiliary orthography codepoints:                                 | * de_Latn (German)           |
|   The following auxiliary characters are missing from the font: Ĕ |                              |
|   The following auxiliary characters are missing from the font: Ĭ |                              |
|   The following auxiliary characters are missing from the font: Ŏ |                              |
|   The following auxiliary characters are missing from the font: ĕ |                              |
|   The following auxiliary characters are missing from the font: ĭ |                              |
|   The following auxiliary characters are missing from the font: ŏ |                              |
|   The following auxiliary characters are missing from the font: ſ |                              |
| Auxiliary orthography codepoints:                                 | * da_Latn (Danish)           |
|   The following auxiliary characters are missing from the font: Ǿ |                              |
|   The following auxiliary characters are missing from the font: ǿ |                              |
| Auxiliary orthography codepoints:                                 | * cs_Latn (Czech)            |
|   The following auxiliary characters are missing from the font: Ĕ | * cy_Latn (Welsh)            |
|   The following auxiliary characters are missing from the font: Ĭ | * es_Latn (Spanish)          |
|   The following auxiliary characters are missing from the font: Ŏ | * hu_Latn (Hungarian)        |
|   The following auxiliary characters are missing from the font: ĕ | * pt_Latn (Portuguese)       |
|   The following auxiliary characters are missing from the font: ĭ | * sk_Latn (Slovak)           |
|   The following auxiliary characters are missing from the font: ŏ | * tr_Latn (Turkish)          |
| Auxiliary orthography codepoints:                                 | * nb_Latn (Norwegian Bokmål) |
|   The following auxiliary characters are missing from the font: Ǎ |                              |
|   The following auxiliary characters are missing from the font: Ŧ |                              |
|   The following auxiliary characters are missing from the font: ǎ |                              |
|   The following auxiliary characters are missing from the font: ŧ |                              |
| Auxiliary orthography codepoints:                                 | * ca_Latn (Catalan)          |
|   The following auxiliary characters are missing from the font: Ĕ |                              |
|   The following auxiliary characters are missing from the font: Ĭ |                              |
|   The following auxiliary characters are missing from the font: Ŀ |                              |
|   The following auxiliary characters are missing from the font: Ŏ |                              |
|   The following auxiliary characters are missing from the font: ĕ |                              |
|   The following auxiliary characters are missing from the font: ĭ |                              |
|   The following auxiliary characters are missing from the font: ŀ |                              |
|   The following auxiliary characters are missing from the font: ŏ |                              |
| Auxiliary orthography codepoints:                                 | * fr_Latn (French)           |
|   The following auxiliary characters are missing from the font: Ǔ |                              |
|   The following auxiliary characters are missing from the font: ſ |                              |
|   The following auxiliary characters are missing from the font: ǔ |                              |
| Auxiliary orthography codepoints:                                 | * fi_Latn (Finnish)          |
|   The following auxiliary characters are missing from the font: Ǧ |                              |
|   The following auxiliary characters are missing from the font: Ǥ |                              |
|   The following auxiliary characters are missing from the font: Ȟ |                              |
|   The following auxiliary characters are missing from the font: Ǩ |                              |
|   The following auxiliary characters are missing from the font: Ŧ |                              |
|   The following auxiliary characters are missing from the font: Ʒ |                              |
|   The following auxiliary characters are missing from the font: Ǯ |                              |
|   The following auxiliary characters are missing from the font: ǧ |                              |
|   The following auxiliary characters are missing from the font: ǥ |                              |
|   The following auxiliary characters are missing from the font: ȟ |                              |
|   The following auxiliary characters are missing from the font: ǩ |                              |
|   The following auxiliary characters are missing from the font: ŧ |                              |
|   The following auxiliary characters are missing from the font: ʒ |                              |
|   The following auxiliary characters are missing from the font: ǯ |                              | [code: warning-language-shaping]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Font has correct separator glyphs? (googlefonts/separator_glyphs)</summary>
    <div>








- ⚠️ **WARN** The following separator glyphs are missing:

* U+2028
* U+2029 [code: missing-separator-glyphs]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Ensure soft_dotted characters lose their dot when combined with marks that
replace the dot. (soft_dotted)</summary>
    <div>








- ⚠️ **WARN** The dot of soft dotted characters used in orthographies _must_ disappear in the following strings:

* ị̂
* ị̄
* ị̀
* ị̃
* ị́
* į̂
* į̄
* į̀
* į̌
* į̃
* į́The dot of soft dotted characters _should_ disappear in other cases, for example:

* ị̈
* ị̊
* ị̒
* ị̉
* ị̇
* ị̌
* ị̋
* ị̆
* į̈
* į̊
* į̒
* į̉
* į̇
* į̋
* į̆ [code: soft-dotted]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check the direction of the outermost contour in each glyph (outline_direction)</summary>
    <div>








- ⚠️ **WARN** The following glyphs have a counter-clockwise outer contour:

* asterisk (U+002A) has a counter-clockwise outer contour
* asterisk (U+002A) has a counter-clockwise outer contour
* lozenge (U+25CA) has a counter-clockwise outer contour [code: ccw-outer-contour]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Check there are no overlapping path segments (overlapping_path_segments)</summary>
    <div>








- ⚠️ **WARN** The following glyphs have overlapping path segments:

* eight (U+0038): Line(Line { p0: (235.0, 32.0), p1: (236.0, -11.0) }) has the same coordinates as a previous segment.
* eight.lf: Line(Line { p0: (235.0, 32.0), p1: (236.0, -11.0) }) has the same coordinates as a previous segment.
* eight.osf: Line(Line { p0: (236.0, 29.0), p1: (238.0, -12.0) }) has the same coordinates as a previous segment.
* eight.sc: Line(Line { p0: (223.0, 27.0), p1: (221.0, -9.0) }) has the same coordinates as a previous segment.
* eight.tf: Line(Line { p0: (235.0, 32.0), p1: (236.0, -11.0) }) has the same coordinates as a previous segment.
* eight.tosf: Line(Line { p0: (259.0, 29.0), p1: (261.0, -12.0) }) has the same coordinates as a previous segment.
* uni20BC (U+20BC): Line(Line { p0: (350.0, 577.0), p1: (391.0, 617.0) }) has the same coordinates as a previous segment. [code: overlapping-path-segments]
  
  

</div>
</details>





<details>
    <summary>⚠️ <b>WARN</b> Ensure fonts have ScriptLangTags declared on the 'meta' table. (googlefonts/meta/script_lang_tags)</summary>
    <div>








- ⚠️ **WARN** This font file does not have a 'meta' table. [code: lacks-meta-table]
  
  

</div>
</details>


</div>
</details>






### Summary

| ⚠️ WARN | ℹ️ INFO | ✅ PASS | ⏩ SKIP | 
| ---|---|---|---|
| 25 | 11 | 225 | 75 | 
| 7% | 3% | 67% | 22% | 



