var fs = require('fs');
var date = new Date();
var outfile = './'
        + (date.getYear() + 1900)
        + (date.getMonth() + 1)
        + date.getDate() + '-'
        + date.getHours()
        + date.getMinutes()
        + date.getSeconds()
        + '.txt';

var fout = fs.createWriteStream(outfile, {
    flags: 'wt',
    encoding: 'utf8',
    mode: '0600'
});

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (chunk) {
    'use strict';
    if (chunk === '\u0003') {
        fout.write('\0');
        fout.close();
        process.exit(0);
    } else if (chunk === '\0') {
        console.log('data:', '\\n');
        fout.write('\n');
    } else {
        console.log('data:', chunk);
        fout.write(chunk);
    }
});