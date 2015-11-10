/*
  # Aprendiendo NODE.JS!

  ## HTTP JSON API SERVER (Ejercicio 13 de 13)

  Escribe un servidor de HTTP que sirva datos en formato JSON cuando reciba
  una petición GET con la ruta (endpoint) '/api/parsetime'. Asume que la
  petición tiene un parámetro 'iso' cuyo valor es un fecha hora en formato
  ISO.

  Por ejemplo:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  La respuesta JSON debe contener únicamente los propiedades 'hour',
  'minute' y 'second' correspondientes a la fecha recibida. Ejemplo:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Luego, agrega un segundo endpoint con ruta '/api/unixtime' que reciba los
  mismos parámetros que la anterior pero que devuelva la fecha en formato
  UNIX, por ejemplo:

     {
         "unixtime": 1376136615474
     }

  El servidor deberá escuchar en un puerto cuyo número será el primer
  argumento del programa.

 ─────────────────────────────────────────────────────────────────────────────

 ## PISTAS

  El objeto request de HTTP tiene un atributo url que deberás usar para
  distinguir las "routes" de cada endpoint.

  Puedes parsear la URL y los parámetros usando el módulo url de Node,
  url.parse(request.url, true) parsea y devuelve un objeto con atributos
  pertinentes.

  Puedes probarlo en la línea de comandos escribiendo:

     $ node -pe "require('url').parse('/test?q=1', true)"

  La documentación del módulo url puede verse en:
  file:///usr/lib/node_modules/learnyounode/node_apidoc/url.html

  Para enviar la respuesta del servidor en formato JSON puedes usar el
  método JSON.stringify(). Asimismo convendría que en la misma le agregaras
  un encabezado 'Content-Type' adecuado, por ejemplo:

     res.writeHead(200, { 'Content-Type': 'application/json' })

  Por último ten en cuenta el objeto JavaScript Date que permite imprimir
  fechas en formato ISO format, por ejemplo: new Date().toISOString().
  También parsea dicho formato cuando se lo pasa por parámetro al
  constructor Date. Revisa también el uso de Date#getTime().
*/

var http = require('http');
var url = require('url');

// Obtener de la lista de parámetros el puerto donde escuchará el servidor.
var port = Number(process.argv[2]);

function procesarSolicitud(req, res) {
    'use strict';
    var resul;

    // Parsear la url. El segundo parámetro indica que también se quiere
    // parsear la querystring.
    var urldata = url.parse(req.url, true);
    var iso = new Date(urldata.query.iso);

    // Esta regla se utiliza por defecto, cuando el pathname de la url no
    // se corresponde con ninguna regla definida.
    var regla404 = function (req, res) {
        res.statusCode = 404;
        res.end('Not Found');
    };

    // Diccionario de reglas: relaciona una ruta con la función que realiza
    // la tarea asociada a esa url.
    var reglas = {

        // Esta regla cumple con el requisito de devolver un objeto
        // json con los valores hora, minuto y segundo del parámetro
        // iso de la querystring.
        '/api/parsetime': function (req, res) {
            res.writeHead(200, {'content-type': 'application/json'});
            resul = {
                hour: iso.getHours(),
                minute: iso.getMinutes(),
                second: iso.getSeconds()
            };
            res.end(JSON.stringify(resul));
        },

        // Esta regla cumple con el requisito de devolver un objeto con
        // el valor del parámetro iso de la querystring en formato unix.
        '/api/unixtime': function (req, res) {
            res.writeHead(200, {'content-type': 'application/json'});
            resul = {
                unixtime: iso.getTime()
            };
            res.end(JSON.stringify(resul));
        }
    };

    // Obtener la regla aplicada a partir del pathname de la url.
    var regla = reglas[urldata.pathname];
    res.socket.setEncoding('utf8');

    // Si hay una regla definida para el pathname de la url, se ivnoca.
    // Si no  la hay, ejecutamos la regla para el error 404.
    if (regla) {
        regla(req, res);
    } else {
        regla404(req, res);
    }
}

// Crear el servidor TCP. El servidor escribe en el socket la fecha y hora
// formateadas.
var server = http.createServer(function (req, res) {
    'use strict';

    // Sólo se admiten solicitudes get. El resto de
    // verbos se responderán con un 405 (Method Not Allowed).
    if (req.method !== 'GET') {
        res.statusCode = 405;
        res.end();
    } else {
        procesarSolicitud(req, res);
    }
});

// Poner el servidor a escuchar en el puerto indicado.
server.listen(port);