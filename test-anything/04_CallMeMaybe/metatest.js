module.exports = function repeatCallback(n, cb) {
    'use strict';
    if (n < 1) {
        return;
    }
    cb();
    repeatCallback(n - 1, cb);
};