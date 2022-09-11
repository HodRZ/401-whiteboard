'use strict'

function handleNotFound(err, req, res, next) {
    res.status(404).send('Sorry! Page Not Found !')
}

module.exports = {
    handleNotFound
}