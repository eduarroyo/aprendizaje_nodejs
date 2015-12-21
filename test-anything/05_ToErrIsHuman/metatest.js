module.exports = function (food) {
    'use strict';
    if (food === 'chocolate') {
        throw new Error('No, chocolate is dangerous!');
    } else {
        return 'yum';
    }
};