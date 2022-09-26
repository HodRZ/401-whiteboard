'use strict'

const { userModel } = require('../../../models');
const { omit, base64, bcrypt } = require('./../../../config/Utils')

async function validateUserCred(req, res, next) {
    try {
        const authHeader = req.headers.authorization.split(' ');
        const encodedValue = authHeader.pop();
        const decodedValue = base64.decode(encodedValue);
        const [email, password] = decodedValue.split(':');
        const user = await userModel.findOne({ where: { email }, raw: true, })
        if (user) {
            const isAuthenticated = await bcrypt.compare(password, user.password);
            if (isAuthenticated) {
                req.body = omit(user, ['password'])
                next()
            } else {
                return res.status(401).json('Username or Password are incorrect');
            }
        } else {
            return res.status(401).json('Username or Password are incorrect');
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    validateUserCred
}