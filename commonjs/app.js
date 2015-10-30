////////////////////////////////////////////////////////////////////////////////////////////////////
//
// CommonJS es un estándar para reutilización de código de otros archivos en javascript.
// Establece las siguientes reglas:
//    1. Cada archivo .js contiene un módulo.
//    2. Cada archivo tiene acceso al módulo que contiene mediante la variable "module".
//    3. De cáda módulo se exporta sólo el contenido de la variable "module.exports";
//    4. Un módulo se importa mediante la función global "require".
//
////////////////////////////////////////////////////////////////////////////////////////////////////

// Uso de require: importar un script.
var biblioteca = require("./biblioteca.js");

// El módulo biblioteca exporta las funciones "sumar" y "restar".
console.log("Funcion sumar: ");
console.log(biblioteca.sumar);
console.log("biblioteca.sumar(2,3) = ", biblioteca.sumar(2,3));
console.log("Funcion restar: ");
console.log(biblioteca.restar);
console.log("biblioteca.restar(3, 1) = ", biblioteca.restar(3,1));

// La función "noExportada" se define en el módulo biblioteca pero no se exporta, por eso su valor
// aquí es undefined.
console.log("Funcion noExportada: ");
console.log(biblioteca.noExportada);