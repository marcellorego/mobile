'use strict'

var status = require('http-status');

var ValidationErrors = {
  REQUIRED: 'required',
  NOTVALID: 'notvalid'
};

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

function handleOne(res, next, error, result) {
  if (error) {
    return handleError(res, error);  
      //{"code":11000,"index":0,"errmsg":"E11000 duplicate key error collection: clipping.users index: email_1 dup key: { : \"joe2@xxx.com\" }","op":{"password":"cRDtpNCeBiql5KOQsKVyrA0sAiA=","name":"Joe Ramone dsdffsd","email":"joe2@xxx.com","_id":"56b7bc50574516a2049ac4d3","loggedInCount":0,"__v":0}
  }

  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ code: status.NOT_FOUND, error: 'Not found' });
  }

  res.json(result);
  
  if (next) {
      next();
  }
}

function handleMany(res, next, error, result) {
  if (error) {
    return handleError(res, error);
  }

  res.json(result);
  
  if (next) {
      next();
  }
}

function handleError(res, error) {
    var result = {};
    if (error.name == 'ValidationError') {
        
        /*var errorMessage = '';
        // go through all the errors...
        for (var errName in error.errors) {
            switch(error.errors[errName].kind) {
                case ValidationErrors.REQUIRED:
                    errorMessage = 'Field is required';
                break;
          case ValidationErrors.NOTVALID:
            errorMessage = 'Field is not valid';
            break;
        }
      }*/
        
        result.message = error.message;
    } else if (error.errmsg) {
        result.code = error.code;
        result.message = error.errmsg;
    } else {
        result.message = error.toString();
    }
    
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json(result);
}