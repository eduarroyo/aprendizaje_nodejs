var fs = require('fs');
var argv = require('optimist').argv;

var rutaOrigen = argv._[0];
var rutaDestino = argv._[1];

var rutasValidas = validarRutas(rutaOrigen, rutaDestino);
var read, write;
if (rutasValidas.ok) {
    read = fs.createReadStream(rutaOrigen);
    write = fs.createWriteStream(rutaDestino);
    read.pipe(write);
} else {
    console.log(rutasValidas.mensaje);
}

////////////////////////////////////////////////////////////////////////////////
// Comprueba la validez de las rutas de origen y destino:
//    · Que se hayan especificado
//    · Que no sean iguales
//    · Que existe el fichero de origen y se puede leer
//    · Que no existe el fichero de destino y se puede escribir
////////////////////////////////////////////////////////////////////////////////
function validarRutas(origen, destino) {
    'use strict';
    var resultado = {};
    if (!origen) {
        resultado.mensaje = "No se ha especificado la ruta de origen.";
        resultado.ok = false;
    } else if (!destino) {
        resultado.mensaje = "No se ha especificado la ruta de destino.";
        resultado.ok = false;
    } else if (origen === destino) {
        resultado.mensaje = "La ruta de destino no puede ser la misma que la de origen.";
        resultado.ok = false;
    } else if (!fs.existsSync(origen)) {
        resultado.mensaje = "No se puede acceder al fichero de origen.";
        resultado.ok = false;
    } else if (fs.existsSync(destino, "w")) {
        resultado.mensaje = "No se puede escribir el fichero de destino.";
        resultado.ok = false;
    } else {
        resultado.ok = true;
    }

    return resultado;
}