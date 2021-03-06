/*
 Master Express.js and have fun!
─────────────────────────────────
 stylus CSS
 Exercise 5 of 8

HTML without styles is boring so this exercise will teach you how to use Stylus with Express on the fly.

Style the HTML from the "STATIC" exercise using Stylus middleware.
Stylus <https://github.com/stylus/stylus> generates .css files on-the-fly from
.styl files.

Your solution should listen on the port supplied by process.argv[2] for
GET requests, one of which will be for main.css, which should be
automatically generated by your Stylus middleware. index.html and main.styl
can be found in process.argv[3] (they are in the same directory).

You could also create your own folder and use these, if you like:

The main.styl file:

    p
      color red

The index.html file:

    <html>
      <head>
        <title>expressworks</title>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <p>I am red!</p>
      </body>
    </html>

-------------------------------------------------------------------------------

## HINTS

You'll want to plug in some stylus middleware using app.use again.
It'll look something like this:

    app.use(require('stylus').middleware('/path/to/*.styl' ))

In addition to producing in the "STATIC" exercise, you'll need to serve static files.
Remember that middleware is executed in the order app.use is called!

## NOTE

For your own projects, Stylus needs to be installed like any other
dependency:

    $ npm install stylus

*/

// Importar los módulos requeridos
var express = require('express');
var stylus = require('stylus');
//var path = require('path');

// Leer los parámetros de línea de comandos
var port = process.argv[2];
var pathParam = process.argv[3];

// Ruta del directorio publico. Será el segundo parámetro de línea de comandos o bien 'public' si
// no se especifica uno.
//var publicPath = pathParam || path.join(__dirname, 'public');

// Crear la app express.
var app = express();

// Configurar el middleware stylus para procesar las solicitudes de hojas de estilos.
// En el parámetro estamos indicando la ruta de las plantillas de hojas de estilos.
app.use(stylus.middleware(pathParam));
app.use(express.static(pathParam));

// Poner al servidor a escuchar en el puerto indicado.
app.listen(port);

// Aunque esta solución pasa la verificación de expressworks, no consigo hacerla funcionar en el
// navegador. La solicitud de main.css siempre da 404. También con la solución oficial, que pongo
// a continuación.

// var express = require('express');
// var app = express();

// app.use(require('stylus').middleware(process.argv[3]));
// app.use(express.static(process.argv[3]));


// app.listen(process.argv[2]);
