/*
 Master Express.js and have fun!
─────────────────────────────────
 JADE
 Exercise 3 of 8

Create an Express.js app with a home page rendered by the Jade template engine.

The home page should respond to /home.

The view should show the current date using 'new Date.toDateString()'.

We use 'toDateString()' to simply return the date in a human-readable format
without the time.

-------------------------------------------------------------------------------

## HINTS

The Jade template file index.jade must look like this:

    h1 Hello World
    p Today is #{date}.

You can use our index.jade (reccommended). The path to index.jade will be provided in
process.argv[3]. Of course, you are welcome to use your own Jade file. Just make sure it's exactly the same as ours.

This is how you can specify the path to the template files in the folder templates:

    app.set('views', path.join(__dirname, 'templates'))

The __dirname is the absolute path of this file and path.join is used to produce cross-platform path (Win vs. Linux/Mac).

To tell Express.js app what template engine to use, apply this line to the
Express.js configuration:

    app.set('view engine', 'jade')

Instead of Hello World's res.end(), the res.render() function accepts
a template name and data (called locals):

    res.render('index', {date: new Date().toDateString()})

We use toDateString() to simply return the date in a human-readable format
without the time.

-------------------------------------------------------------------------------

## NOTE

When creating your projects from scratch, install the jade dependency with npm.
If you run $ npm install on this package (expressworks), you should have jade installed.

Again, the port to use is passed by expressworks to the application as process.argv[2].

If you receive Error: Cannot find module 'jade', it is because Express is looking for Jade relative to its path. You can fix this by running npm install jade.
*/

// Importar los paquetes necesarios.
var express = require('express');
var path = require('path');

// Obtener los parámetros de línea de comandos
var port = process.argv[2];
var pathParam = process.argv[3];

// Ruta de las plantillas jade. Se indica en el segundo parámetro
// de línea de comandos. Si no se especifica, se utiliza 'templates',
var templatesPath = pathParam || path.join(__dirname, 'templates');

// Crear la app express.
var app = express();

// Establecer la ruta de las plantillas.
app.set('views', templatesPath);

// Indicar que se va a utilizar jade como procesador de vistas.
app.set('view engine', 'jade');

// Configurar la acción para la ruta '/home'.
// La acción consiste en renderizar la plantilla index.jade
// a la que pasamos como modelo la fecha actual como texto.
app.get('/home', function (req, res) {
    'use strict';
    res.render('index', {date: new Date().toDateString()});
});

// Poner el servidor a escuchar el puerto indicado por línea de comandos.
app.listen(port);