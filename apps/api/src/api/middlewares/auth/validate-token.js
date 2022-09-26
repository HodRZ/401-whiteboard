'use strict'

const { AC_TOKEN, REFRESH_TOKEN } = require("../../../config")
const { jwt } = require("../../../config/Utils")

function validateToken(req, res, next) {
    if (!req.headers.authorization) {
        next('Not Authorized')
    }
    try {
        const token = req.headers.authorization.split(' ').pop()
        const userInfo = jwt.verify(token, AC_TOKEN, (err, info) => {
            (err) ? next(err) : info
        })
        req.user = userInfo
        next()
    } catch (e) {
        next(e)
    }
}

function validateRefreshToken(req, res, next) {
    if (!req.headers.cookie) {
        next('Not Authorized')
    }
    try {
        const refreshToken = req.cookies.refresh_token
        const verified = jwt.verify(refreshToken, REFRESH_TOKEN)
        req.verified = verified
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    validateToken,
    validateRefreshToken
}