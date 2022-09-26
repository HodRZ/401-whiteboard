'use strict'

const { REFRESH_TOKEN } = require("../../../config")
const { jwt } = require("../../../config/Utils")

const addRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '3h' })
}
module.exports = { addRefreshToken }

