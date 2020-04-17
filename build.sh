rm -rf app/build
rm -rf static
cd app
npm run build
cd ..
mv app/build/static static

cd static/js
mainfilename=`ls | grep "^main\..*.chunk.js$"`
mv $mainfilename main.js

auxfilename=`ls | grep "^2\..*.chunk.js$"`
mv $auxfilename 2.js

cd ../css
maincssfilename=`ls | grep "^main\..*.chunk.css$"`
mv $maincssfilename main.css