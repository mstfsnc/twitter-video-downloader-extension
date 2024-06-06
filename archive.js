/* eslint-disable no-undef */
const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream(__dirname + '/extension.zip');
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', () => {
    console.log('Finished creating zip file.')
    console.log(`Total size: ${archive.pointer() / 1000}kb`)
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);

archive.directory(`${__dirname}/dist`, '');

archive.finalize();