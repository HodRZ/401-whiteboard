'use strict'

class GenericError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

function GenericErrorHandler(err, req, res, next) {
    const { status, message } = err
    res.status(status).json(message)
}

module.exports = { GenericError, GenericErrorHandler }