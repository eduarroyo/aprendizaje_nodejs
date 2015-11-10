var fs = require('fs');
var path = require('path');

function filtrarPorExtension(ruta, extension, callback) {
    'use strict';
    fs.readdir(ruta, function (error, archivos) {
        var resul = [];
        if (error) {
            callback(error);
        } else {
            extension = '.' + extension;
            resul = archivos.filter(function (item) {
                return path.extname(item) === extension;
            });
            callback(null, resul);
        }
    });
}

module.exports = filtrarPorExtension;