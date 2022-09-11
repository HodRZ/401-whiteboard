'use strict'

function handleServerError(err, req, res, next) {
    res.status(500).send('Something Went Wrong !')
}

module.exports = {
    handleServerError
}