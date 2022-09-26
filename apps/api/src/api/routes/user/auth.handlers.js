'use strict'

const { AC_TOKEN } = require("../../../config");
const { omit, jwt } = require("../../../config/Utils")
const { User, userModel } = require("../../../models");
const { addRefreshToken } = require("../../middlewares/auth");

async function signIn(req, res) {
    try {
        const user = req.body
        const token = jwt.sign({
            username: user.username,
            userId: user.id,
            userEmail: user.email
        }, AC_TOKEN, { expiresIn: "1H" })
        const refresh_token = addRefreshToken({
            userId: user.id,
            userEmail: user.email
        })
        user.token = token
        return res.status(200)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 3 * 60 * 60 * 1000
            })
            .json(user)
    } catch (e) {
        return res.status(401).json('Username or Password are incorrect');
    }
}

async function signUp(req, res, next) {
    try {
        const newUser = req.body;
        const createdUser = await User.create(newUser, next);
        const addedUser = omit(createdUser.dataValues, ['password'])
        const token = jwt.sign({
            username: addedUser.username,
            userId: addedUser.id,
            userEmail: addedUser.email
        }, AC_TOKEN, { expiresIn: '10m' })
        const refresh_token = addRefreshToken({
            userId: addedUser.id,
            userEmail: addedUser.email
        })
        addedUser.access_token = token
        await createdUser.update({ refresh_token })
        return res.status(201)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 3 * 60 * 60 * 1000
            })
            .json(addedUser);

    } catch (e) {
        next(e)
    }
}

async function refreshSignIn(req, res, next) {
    try {
        const { userId } = req.verified
        const user = await userModel.findOne({
            where: { id: userId },
            attributes: { exclude: ['refresh_token', 'password'] }
        })
        const refresh_token = addRefreshToken({
            userId: user.id,
            userEmail: user.email
        })
        const token = jwt.sign({
            username: user.username,
            userId: user.id,
            userEmail: user.email
        }, AC_TOKEN, { expiresIn: '30m' })
        await userModel.update({ refresh_token }, {
            where: { id: userId },
            returning: true,
            attributes: { exclude: ['refresh_token'] }
        })
        user.access_token = token
        return res.status(201)
            .cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 3 * 60 * 60 * 1000
            })
            .json(user);

    } catch (e) {
        next(e)
    }
}

module.exports = {
    signIn,
    signUp,
    refreshSignIn
}