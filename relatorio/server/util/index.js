'use strict'

var status = require('http-status');

module.exports = {
    copyBodyData: copyBodyData,
    handleOne: handleOne,
    handleMany: handleMany
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

function handleOne(res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  res.json(result);
}

function handleMany(res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  res.json(result);
}