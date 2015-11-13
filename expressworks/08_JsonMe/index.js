/*
 Master Express.js and have fun!
─────────────────────────────────
 JSON ME
 Exercise 8 of 8

Most of the times we're building RESTful API servers with JSON.

Write a server that, when it receives a GET, reads a file, parses it to JSON,
and responds with that content to the user.

The server should respond to any GET that matches the /books resource path.
As always, the port is passed in process.argv[2]. The file to read is passed
in process.argv[3].

Respond with:

    res.json(object)

Everything should match the /books resource path.

For reading the file, use the fs module, e.g.,

    fs.readFile(filename, callback)

-------------------------------------------------------------------------------

## HINTS

While the parsing can be done with JSON.parse:

    object = JSON.parse(string)

No need to install the fs module. It's part of the core and the Node.js platform.
*/

// Importar los módulos requeridos
var express = require('express');
var fs = require('fs');

// Procesar los parámetros de línea de comandos
var port = process.argv[2];
var filePath = process.argv[3];

// Crear el servidor express
var app = express();

// Configurar los endpoints del servicio
// En este ejemplo se trata de leer un fichero con contenido json, parsearlo
// y enviarlo como cuerpo de una respuesta json.
// Añado los controles de error después de haber visto la solución.
app.get("/books", function (req, res) {
    'use strict';
    fs.readFile(filePath, function (error, content) {
        if (error) {
            res.sendStatus(500);
        } else {
            try {
                var resul = JSON.parse(content);
                res.json(resul);
            } catch (e) {
                res.sendStatus(500);
            }
        }
    });
});

// Poner el servidor a escuchar el puerto indicado por parámetors de línea de comandos
app.listen(port);