module.exports = function (str, allcaps, char) {
    'use strict';
    if (allcaps) {
        str = str.toUpperCase();
    }
    char = char || '*';
    return '~' + char + '~' + str + '~' + char + '~';
};