var http = require('http');
var fs = require('fs');
var path = require('path');

var app = function(request, response) {
	console.log(request.method);
	console.log(request.url);
	if(request.method === "GET") {
		if(request.url === '/') {
			filePath = '/index.html';
		} else {
			filePath = request.url;
		}

		fs.exists(filePath, function(exists) {
			if(exists) {
				fs.statusCode = 200;
				fs.createReadStream(filePath).pipe(response);
			} else {
				sendNotFound(response);
			}
		});
	} else {
		sendMethodNotAllowed(response);
	}
};

function sendNotFound(response) {
	response.statusCode = 404;
	response.write("Recurso no encontrado");
	response.end();
}

function sendMethodNotAllowed(response) {
	response.statusCode = 405;
	response.write("Método HTTP no admitido");
	response.end();
}

var server = http.createServer(app);

server.listen(3000);
console.log("Servidor a la escucha en http://127.0.0.1:3000/");