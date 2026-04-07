

#gftools builder sources/config.yaml 
#gftools check-font sources/config.yaml 

#gftools builder sources/config-italic.yaml 

 #  git init
 #  git status
 #  git add .
 #  git commit -m"init"
git config http.postBuffer 524288000
git remote get-url origin
git rev-parse --short HEAD


#ln -sfn ../GlobalVenv/venv venv
ln -sfn ../GlobalTypeEngine/venv venv
#fontmake -i Kierkegaard SemiBold -o ufo -g Kierkegaard.glyphs --ufo-structure=json --instance-dir instance_ufos
#FAILED: [code=1] instance_ufos/Kierkegaard-SemiBold.ufo.json 
#/Users/jdrees/github/GlobalVenv/venv/bin/python3.12 -m gftools.builder.jobrunner fontmake -i "Kierkegaard SemiBold" -o ufo -g Kierkegaard.glyphs --ufo-structure=json --instance-dir instance_ufos 

cd custom
ln -sfn ../fonts fonts

## alle SC Fonts umbennenen
for f in fonts/ttf/*; do
  base=$(basename "$f")
  #if [[ "$base" == *SC* ]]; then
    # Entfernt "SC" und ersetzt "Kierkegaard" durch "KierkegaardSC"
    # newname=$(echo "$base" | sed 's/SC//g' | sed 's/Kierkegaard/KierkegaardSC/g')
    #mv "fonts/ttf/$base" "fonts/ttf/$newname"
  #fi
done

# AMFF = all my font files
AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')

echo '-- Links for Readme.md file'

rm ../documentation/image-*.png

for i in $AMFF ; do 
  echo "![Sample Image](documentation/image-"${i}".png)"
done

#@font-face { font-family: Nigggli-CondensedRegular; src: url("../fonts/ttf/Nigggli-CondensedRegular.ttf"); }
for i in $AMFF ; do 
  echo "@font-face { font-family: "${i}"; src: url(\"../fonts/ttf/"${i}".ttf\"); }"
done

### PRINT IMAGES

echo '-- create png preview images'

for i in $AMFF ; do 
  echo "$i"
  node scripts/printImage.js images/Image.html ../fonts/ttf/$i.ttf ../documentation/image-$i.png
done


### PRINT PROOFS

echo '-- create pdfs for tests'

mkdir ../out/qa

rm ../out/qa/*.pdf

echo $AMFF

for i in $AMFF ; do 
  #node scripts/print.js qa/Glyphs.html ../fonts/ttf/$i.ttf ../out/qa/1-Glyphs-$i.pdf
  node scripts/print.js qa/Spacing.html ../fonts/ttf/$i.ttf ../out/qa/2-Spacing-$i.pdf
  node scripts/print.js qa/Kerning.html ../fonts/ttf/$i.ttf ../out/qa/3-Kerning-$i.pdf
  node scripts/print.js qa/Frequency.html ../fonts/ttf/$i.ttf ../out/qa/4-Frequency-$i.pdf
  #node scripts/print.js qa/Kafka.html ../fonts/ttf/$i.ttf ../out/qa/5-Kafka-$i.pdf
  #node scripts/print.js qa/News.html ../fonts/ttf/$i.ttf ../out/qa/6-News-$i.pdf
  node scripts/print.js qa/Diacritics.html ../fonts/ttf/$i.ttf ../out/qa/7-Diacritics-$i.pdf
  node scripts/print.js qa/Blatt.html ../fonts/ttf/$i.ttf ../out/qa/8-Blatt-$i.pdf
done


### PRINT ATLAS

echo '-- create atlas'

AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')
for i in $AMFF ; do 
  echo "$i"
  # node scripts/atlas.js ../fonts/otf/$i.otf > ../out/qa/0-Atlas-$i.html
  # node scripts/atlas.js ../fonts/ttf/$i.ttf > ../out/qa/0-Atlas-$i.html
  # node scripts/print.js ../out/qa/0-Atlas-$i.html
  # rm ../out/qa/0-Atlas-$i.html
  # node scripts/charset.js ../fonts/ttf/$i.ttf > ../out/qa/0-Charset-$i.html
  # node scripts/print.js ../out/qa/0-Charset-$i.html
  # rm ../out/qa/0-Charset-$i.html
done


cp ../out/qa/*.pdf ../documentation


### PRINT SPECIMENS

echo '-- create specimen for documentation'

node scripts/printwo.js specimen/Specimen.html
node scripts/printwo.js specimen/SpecimenNL.html
#node scripts/printwo.js specimen/Etik.html
#node scripts/printwo.js specimen/Brentano.html
#node scripts/printwo.js specimen/Picon.html
#node scripts/printwo.js specimen/Woolf.html
#node scripts/printwo.js specimen/Schiller.html
#node scripts/printwo.js specimen/Martens.html
#node scripts/printwo.js specimen/Dumas.html
#node scripts/printwo.js specimen/Adamson.html
#node scripts/printwo.js specimen/Endrődi.html
#node scripts/printwo.js specimen/Heisenberg.html
#node scripts/printwo.js specimen/Cicero.html
node scripts/printwo.js specimen/Crops.html
#node scripts/printwo.js specimen/Aristoteles.html

mv specimen/*.pdf ../documentation

cd ..


### ENCODE CUSTOM FONTS TO BASE64 FOR CSS INJECTION

# node custom/scripts/metrics.js fonts/otf/OHamburgC-Regular.otf > documentation/metrics.txt

# jdrees@Jorgs-MacBook-Pro ttf % cat Kierkegaard-Regular.ttf |  base64 > Kierkegaard-Regular.txt
# jdrees@Jorgs-MacBook-Pro ttf % cat Kierkegaard-Bold.ttf |  base64 > Kierkegaard-Bold.txt      
# jdrees@Jorgs-MacBook-Pro ttf % cat Kierkegaard-Italic.ttf |  base64 > Kierkegaard-Italic.txt
# jdrees@Jorgs-MacBook-Pro ttf % cat Kierkegaard-BoldItalic.ttf |  base64 > Kierkegaard-BoldItalic.txt


### COLLECT PREVIEW FILES

echo '-- copy files to pages folder'

mkdir pages
mkdir pages/specimen
mkdir pages/otf
mkdir pages/ttf

rm pages/specimen/*.pdf
cp documentation/SpecimenNL.html.pdf pages/specimen

rm pages/otf/*
cp fonts/otf/* pages/otf
rm pages/ttf/*
cp fonts/ttf/* pages/ttf

rm pages/download.zip
//zip -j pages/download.zip pages/otf/*
zip -j pages/download.zip pages/ttf/*

echo '-- done'