function sumar(a, b) {
	return a + b;
}

function restar(a, b) {
	return a-b;
}

function noExportada(a) {
	return a;
}

module.exports = {
	sumar: sumar,
	restar: restar
};