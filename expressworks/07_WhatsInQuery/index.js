/*
 WHAT'S IN QUERY
 Exercise 7 of 8

Oftentimes, we need to process the data from the URL query string (urlencoded).

Write a route that extracts data from the query string in the GET /search URL
route, e.g. ?results=recent&include_tabs=true and then outputs it back to
the user in JSON format.

Use app.get('/search', function(){...}) for the route.

In Express.js, to extract query string parameters, we can use (inside the request handler):

    req.query.NAME

-------------------------------------------------------------------------------

## HINTS

No need to install query middleware. It's part of the Express.js framework.

To output JSON we can use:

    res.send(object)
*/

// Importar los módulos requeridos
var express = require('express');

// Procesar los parámetros de línea de comandos
var port = process.argv[2];

// Crear el servidor express
var app = express();

// Configurar los endpoints del servicio

// En este ejemplo podemos ver cómo acceder a la querystring sin necesidad de utilizar
// ningún middleware. Express se encarga de parsear la querystring y colocar los valores
// en el objeto req.query. Simplemente se está poniendo en la respuesta como json.
app.get('/search', function (req, res) {
    'use strict';
    res.send(req.query);
});

// Poner el servidor a escuchar el puerto indicado por parámetors de línea de comandos
app.listen(port);