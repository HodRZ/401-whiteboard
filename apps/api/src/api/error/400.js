'use strict'

function handleNotFound(err, req, res, next) {
    res.status(404).json('Sorry! Page Not Found !')
}

module.exports = {
    handleNotFound
}