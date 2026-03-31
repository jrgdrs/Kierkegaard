cd custom

echo '-- link to fonts folder'
ln -sfn ../fonts fonts

# AMFF = all my font files
AMFF=$(ls -1 fonts/ttf | sed 's/.ttf//g' | tr '\n' ' ')
AMFF=$(ls -1 fonts/ttf | grep -E 'Text-Regular.|TextSC-Regular.|Text-Italic.|Text-Bold.ttf' | sed 's/.ttf//g' | tr '\n' ' ')


# AMPF = all my proof files
AMPF=$(ls -1 proofs | grep .html | sed 's/.html//g' | tr '\n' ' ')

echo '-- remove old pdfs in documentation/proofs folder'
mkdir ../documentation/proofs
rm ../documentation/proofs/*.pdf

echo '-- create pdf proof files'
for i in $AMFF ; do 
    for j in $AMPF ; do 
        echo "Printing $i - $j ..."
        node scripts/printProof.js proofs/$j.html fonts/ttf/$i.ttf ../documentation/proofs/$j-$i.pdf
    done
done

echo '== files created'


