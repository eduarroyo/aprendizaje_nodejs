/*
 Master Express.js and have fun!
─────────────────────────────────
 GOOD OLD FORM
 Exercise 4 of 8

Forms are important. This exercise will teach you how to process the traditional (non-AJAX) web form.

Write a route ('/form') that processes HTML form input
(<form><input name="str"/></form>) and prints the value of str backwards.

To handle a POST request, use the post() method which is used the same way as get():

    app.post('/path', function(req, res){...})

Express.js uses middleware to provide extra functionality to your web server.

Simply put, a middleware is a function invoked by Express.js before your own
request handler.

Middleware provide a large variety of functionality such as logging, serving
static files, and error handling.

A middleware is added by calling use() on the application and passing the
middleware as a parameter.

To parse x-www-form-urlencoded request bodies, Express.js can use urlencoded()
middleware from the body-parser module.

    var bodyparser = require('body-parser')
    app.use(bodyparser.urlencoded({extended: false}))

-------------------------------------------------------------------------------

## HINTS

Here is how we can print characters backwards (just one way to do it):

    req.body.str.split('').reverse().join('')

Extended set to true (qs) or false (querystring) determines the parser module.

Read more about Connect middleware here:

  [https://github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)

The documentation of the body-parser module can be found here:

  [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)

-------------------------------------------------------------------------------

## NOTE

When creating your projects from scratch, install the body-parser dependency
with npm by running:

    $ npm install body-parser

…in your terminal.

Again, the port to use is passed expressworks to the application as process.argv[2].

*/

// Importar los paquetes necesarios.
var express = require('express');
var bp = require('body-parser');
var fs = require('fs');

// Obtener los parámetros de línea de comandos
var port = process.argv[2];


// Crear la app express.
var app = express();

// Pila de middlewares. Cada solicitud se pasa uno por uno a todos los middlewares de la pila y
// cada uno aplica su procedimiento e invoca al siguiente, o bien produce una respuesta del
// servidor.
// El middleware bodyparser nos permite procesar el cuerpo de la solicitud. En este caso estamos
// indicando que además queremos parsear la querystring de la url.
// Probablemente sería mejor añadir este middleware a la pila sólo para solicitudes post:
// app.post('<ruta>', bp.urlencoded({extend: true}), function(req, res) {...});
app.use(bp.urlencoded({extended: false}));

// Manejador para todas las solicitudes get (cualquier ruta).
// Ante cualquier solititud get, el servidor entrega un fragmento de html
// que contiene un formulario, que permite entrar un texto identificado por 'str' y enviarlo al
// sevidor mediante una solicitud post.
// Esta funcionalidad no forma parte del ejercicio.
app.get('*', function (req, res) {
    'use strict';
    fs.createReadStream('form.html').pipe(res);
});

// Manejador para todas las solicitudes post a la ruta /form.
// Ante estas solicitudes, el servidor busca la propiedad str del cuerpo de la solicitud
// (previamente procesada por el middleware body-parser.urlencoded), la invierte y la escribe en
// el cuerpo de la respuesta.
app.use('/form', function (req, res) {
    'use strict';
    var resul = reverseString(req.body.str);
    res.send(resul);
});

// Poner el servidor a escuchar el puerto indicado por línea de comandos.
app.listen(port);

// Invierte la cadena recibida como parámetro.
function reverseString(str) {
    'use strict';
    return str.split('').reverse().join('');
}