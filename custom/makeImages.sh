cd custom

echo '-- link to fonts folder'
ln -sfn ../fonts fonts

# AMFF = all my font files
AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')

# AMIF = all my image files
AMIF=$(ls -1 images | grep .html | sed 's/.html//g' | tr '\n' ' ')

echo '-- remove old images in documentation/images folder'
mkdir ../documentation/images
rm ../documentation/images/*.png

echo '-- create png preview images'
for i in $AMFF ; do 
    for j in $AMIF ; do 
        echo "Printing $i - $j ..."
        node scripts/printImage.js images/$j.html fonts/ttf/$i.ttf ../documentation/images/$j-$i.png
    done
done

echo '== images created'

