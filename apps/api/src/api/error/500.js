'use strict'

function handleServerError(err, req, res, next) {
    res.status(500).json('Something Went Wrong !')
}

module.exports = {
    handleServerError
}