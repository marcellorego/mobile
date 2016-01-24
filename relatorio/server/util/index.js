'use strict'

module.exports = {
    copyBodyData: copyBodyData
}

function copyBodyData(model, body, copyFunctions) {
    for (var prop in body) {
        if (body[prop] !== undefined) {
            if (copyFunctions && copyFunctions.hasOwnProperty(prop)) {
                var fn = copyFunctions[prop];
                model[prop] = fn(body[prop]);
            } else {
                model[prop] = body[prop];    
            }
        }
    }
}