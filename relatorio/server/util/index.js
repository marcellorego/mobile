'use strict'

module.exports = {
    copyBodyData: copyBodyData
}

function copyBodyData(model, body, copyFunctions) {
    for (var prop in model) {
        if (body.hasOwnProperty(prop)) {
            if (copyFunctions.hasOwnProperty()) {
                model[prop] = copyFunctions[prop](body[prop]);
            } else {
                model[prop] = body[prop];    
            }
        }
    }
}