cd custom

echo '-- link to fonts folder'
ln -sfn ../fonts fonts

# AMFF = all my font files
AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')

# AMIF = all my insta files
AMIF=$(ls -1 insta | grep .html | sed 's/.html//g' | tr '\n' ' ')

echo '-- remove old insta images in documentation/insta folder'
mkdir ../documentation/insta
rm ../documentation/insta/*.png

echo '-- create png preview images'
for i in $AMFF ; do 
    for j in $AMIF ; do 
        echo "Printing $i - $j ..."
        node scripts/printInsta.js insta/$j.html fonts/ttf/$i.ttf ../documentation/insta/$j-$i.png
    done
done

echo '== insta images created'

