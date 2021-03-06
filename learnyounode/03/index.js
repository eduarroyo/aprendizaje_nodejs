/*
# Aprendiendo NODE.JS!

 ## MY FIRST I/O! (Ejercicio 3 de 13)

Escribe un programa que, usando una llamada síncrona al sistema de
archivos, lea un archivo recibido por argumento e imprima a consola la
cantidad de saltos de línea ('\n') que contiene. Similar a ejecutar cat
file | wc -l.

El programa recibirá la ruta al archivo como único argumento.

 ─────────────────────────────────────────────────────────────────────────────

 ## PISTAS

Para resolver este ejercicio usaremos el módulo fs del núcleo de Node.
Para cargar dicho módulo o cualquier módulo es necesario hacer:

 var fs = require('fs')

De este modo, el módulo fs estará disponible en esa variable.

Toda operación síncrona (o de bloqueo) del sistema de archivos en el
módulo fs tiene sufijo 'Sync'. Para leer un archivo debes usar
fs.readFileSync('/path/to/file'). Éste devuelve un objeto Buffer con los
contenidos del archivo.

Puedes leer la documentación del módulo fs en:
file:///usr/lib/node_modules/learnyounode/node_apidoc/fs.html

Los objetos Buffer de Node son una representación eficiente de Arrays de
datos en variedad de formatos como ser ASCII, binarios o UTF-8 entre
otros. Los objetos Buffer se pueden convertir en String usando el método
toString() por ejemplo: var str = buf.toString().

Puedes leer la documentación del objeto Buffer en:
file:///usr/lib/node_modules/learnyounode/node_apidoc/buffer.html

Si buscas una forma sencilla de contar el número de saltos de línea en un
string, piensa que puedes convertir un String de Javascript en un array de
substrings usando .split(), y que puedes usar '\n' como delimitador.
Nótese que el fichero de test no tiene ningún salto de línea ('\n') al
final de la última línea, con lo que al usar este método acabarás
obteniendo un array que tiene un elemento más que el número de saltos de
línea.
*/

var fs = require("fs");
var ruta = process.argv[2];

var buffer = fs.readFileSync(ruta);
var contenido = buffer;.toString();

// Podemos evitar el toString al buffer indicando la codificación en readFileSync
//var buffer = fs.readFileSync(ruta, 'utf8');
//var contenido = buffer;.toString();

var lineas = contenido.split("\n");
console.log(lineas.length - 1);