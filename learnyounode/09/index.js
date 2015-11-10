/*
 # Aprendiendo NODE.JS!

 ## JUGGLING ASYNC (Ejercicio 9 de 13)

Este ejercicio es similar al anterior puesto que debes usar http.get().
Sin embargo, esta vez tu programa recibirá tres URLs como argumentos.

Tu programa deberá imprimir el contenido de cada una de las URLs en
consola en el mismo orden que fueron recibidos los argumentos. No deberás
imprimir el largo, solo el contenido como String, pero debes respetar el
orden de llegada de los argumentos.

 ─────────────────────────────────────────────────────────────────────────────

 ## PISTAS

Como las llamadas a las URLs son asíncronas, es probable que no recibas
las respuestas en orden por lo que no puedes imprimir las respuestas a
medida que llegan.

Tendrás que encolar los resultados y mantener un contador de cuántas
peticiones han sido recibidas de modo que al llegar al final puedas
imprimir los resultados.

En la vida real, hay varias librerías como [async](http://npm.im/async) y
[after](http://npm.im/after) que facilitan la continuación de los
callbacks. Para el alcance de este ejercicio no es necesario usar
librerías externas.
*/

var http = require('http');
var bl = require('bl');

// Toma todos los argumentos posteriores a la invocación del programa.
// Todos ellos deberían ser URLs.
var urls = process.argv.slice(2);

// Las urls se mapean a objetos que mantienen la url, el estado (terminado
// o no) de la solicitud y los datos obtenidos. El array de solicitudes
// mantiene el mismo orden en que estaban las urls en la línea de comandos.
var solicitudes = urls.map(function (item) {
    'use strict';
    return {
        url: item,
        terminado: false,
        datos: ''
    };
});

// Realiza una solicitud get por cada objeto del array solicitudes.
// Al completar cada get, los datos recibidos se almacenan en la propiedad
// datos del objeto solicitud correspondiente (mantenido en la closure) y
// se marca dicho objeto como terminado. Al terminar cada solicitud se
// comprueba que todas han terminado y en ese caso se escribe el resultado.
solicitudes.forEach(function (solicitud) {
    'use strict';
    http.get(solicitud.url, function (request) {
        request.pipe(bl(function (err, data) {
            // Almacenar los datos o el mensaje de error.
            solicitud.datos = err !== null
                ? err
                : data.toString();
            solicitud.terminado = true;
            comprobarSolicitudes();
        }));
    });
});

// Comprueba que todas las solicitudes hayan finalizado y en ese caso
// invoca a escribirResultado.
function comprobarSolicitudes() {
    'use strict';
    var todosTerminados = solicitudes.every(function (item) {
        return item.terminado;
    });
    if (todosTerminados) {
        escribirResultado();
    }
}

// Escribe en pantalla los datos recibidos de todas las solicitudes por
// orden.
function escribirResultado() {
    'use strict';
    solicitudes.forEach(function (s) {
        console.log(s.datos);
    });
}