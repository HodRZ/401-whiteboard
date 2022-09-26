'use strict'

const { userModel } = require("../../../models");


async function isEmailUnique(req, res, next) {
    try {
        req.body.email = req.body.email.toLowerCase()
        const email = req.body.email
        const user = await userModel.findOne({ where: { email }, raw: true, })
        if (!user) {
            next()
        } else {
            return res.status(401).json('Email already exist');
        }
    } catch (e) {
        next(e)
    }
}
module.exports = {
    isEmailUnique
}