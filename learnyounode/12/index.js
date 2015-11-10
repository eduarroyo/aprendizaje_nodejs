/*
 # Aprendiendo NODE.JS!

 ## HTTP UPPERCASERER (Ejercicio 12 de 13)

  Escribe un servidor HTTP que reciba sólo peticiones POST y convierta los
  caracteres del cuerpo de la petición a mayúsculas y lo devuelva al
  cliente.

  El servidor deberá escuchar en un puerto cuyo número será el primer
  argumento del programa.

 ─────────────────────────────────────────────────────────────────────────────

 ## PISTAS

  Para resolver el ejercicio es conveniente usar las capacidades de
  streaming de los objetos request y response pero no obligatorio.

  Hay muchos paquetes en el registro de npm que permiten "transformar"
  streams. Para este ejercicio sugerimos usar through2-map pues su API es
  simple.

  through2-map te permite crear un transform stream que recibe un chunk data
  y lo devuelve modificado. Funciona como Array#map() pero se aplica a
  streams:

     var map = require('through2-map')
     inStream.pipe(map(function (chunk) {
       return chunk.toString().split('').reverse().join('')
     })).pipe(outStream)

  En el ejemplo inStream se convierte a String luego se inverten los the
  caracteres y el resultado se concatena al outStream. Básicamente es un
  inversor de caracteres. Recuerda que el tamaño del chunk se determina al
  principio (up-stream) y no hay mucho control del tamaño de los datos
  recibidos por el servidor.

  Para instalar through2-map escribe en la consola:

     $ npm install through2-map

  En caso de no tener conexión a Internet, simplemente crea una carpeta
  node_modules y copia el paquete desde el directorio de instalación de
  learnyounode, es decir:

  file:///usr/lib/node_modules/learnyounode/node_modules/through2-map

  La documentación del paquete through2-map puede verse en:

  file:///usr/lib/node_modules/learnyounode/docs/through2-map.html
*/

var http = require('http');
var map = require('through2-map');

// Obtener de la lista de parámetros el puerto donde escuchará el servidor.
var port = Number(process.argv[2]);

// Crear el servidor TCP. El servidor escribe en el socket la fecha y hora
// formateadas.
var server = http.createServer(function (req, res) {
    'use strict';

    // Filtrar solicitudes post: sólo procesamos estas. Las otras sólo
    // recibirán como respuesta un mensaje de error.
    if (req.method === 'POST') {
        // Establecer el encabezado http de la respuesta.
        res.writeHead(200, {'content-type': 'text/plain'});

        // Enlazamos la solicitud mediante pipes, primero con la función
        // que realiza el procesamiento y luego con la respuesta.
        req.pipe(map(procesarCuerpoSolicitud)).pipe(res);
    } else {
        res.statusCode = 405;
        res.end();
    }
});

// Poner el servidor a escuchar en el puerto indicado.
server.listen(port);

// Convierte a mayúsculas el texto recibido.
function procesarCuerpoSolicitud(chunk) {
    'use strict';
    return chunk.toString().toUpperCase();
}