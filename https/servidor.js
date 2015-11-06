var http = require('http');

var server = http.createServer(function(request, response) {
    console.log("Solicitud recibida");
    response.write("Hola Rosalía!");
    response.end();
});

server.listen(3000);
console.log("Servidor a la escucha en http://127.0.0.1:3000/");