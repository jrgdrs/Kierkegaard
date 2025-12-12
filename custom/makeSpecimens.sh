cd custom

echo '-- link to fonts folder'
ln -sfn ../fonts fonts

# AMFF = all my font files
AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')

# AMSF = all my specimen files
AMSF=$(ls -1 specimens | grep .html | sed 's/.html//g' | tr '\n' ' ')

echo '-- remove old pdfs in documentation/specimens folder'
mkdir ../documentation/specimens
rm ../documentation/specimens/*.pdf

echo '-- create pdf specimen files'
for j in $AMSF ; do 
    echo "Printing $j ..."
    node scripts/printSpecimen.js specimens/$j.html fonts ../documentation/specimens/$j.pdf
done

echo '== files created'


