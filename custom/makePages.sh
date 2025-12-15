## COLLECT PREVIEW FILES

echo '-- copy files to pages folder'

mkdir pages
mkdir pages/specimen
mkdir pages/otf
mkdir pages/ttf

rm pages/specimen/*.pdf
cp documentation/specimens/SpecimenNL.pdf pages/specimen

rm pages/otf/*
cp fonts/otf/* pages/otf
rm pages/ttf/*
cp fonts/ttf/* pages/ttf

rm pages/download.zip
//zip -j pages/download.zip pages/otf/*
zip -j pages/download.zip pages/ttf/*

echo '-- done'