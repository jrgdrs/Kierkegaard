cd custom

echo '-- link to fonts folder'
ln -sfn ../fonts fonts

# AMFF = all my font files
AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')

# AMSF = all my map files
AMMF=$(ls -1 maps | grep .js | sed 's/.js//g' | tr '\n' ' ')

echo '-- remove old pdfs in documentation/maps folder'
mkdir ../documentation/maps
rm ../documentation/maps/*.pdf

echo '-- create pdf maps files'
for i in $AMFF ; do 
    for j in $AMMF ; do 
        echo "Printing $i - $j ..."
        node maps/$j.js ../fonts/ttf/$i.ttf > ../documentation/maps/$j-$i.html
        node scripts/printSpecimen.js ../documentation/maps/$j-$i.html
        rm ../documentation/maps/$j-$i.html
    done
done

echo '== files created'



