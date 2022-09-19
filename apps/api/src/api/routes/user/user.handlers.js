'use strict'

const { User } = require('../../../models')

async function getUser(req, res, next) {
    try {
        const user = await User.get(next);
        res.status(200).json({
            user
        })
    } catch (e) {
        console.error(e)
    }
};


async function getUserById(req, res, next) {
    const id = req.params.id;
    const { filter } = req.query
    try {
        const user = await User.getPopulated(id, next, filter);
        res.status(200).json(user)
    } catch (err) { next(err) }
};

async function deleteUser(req, res, next) {
    const id = req.params.id;
    try {
        let deletedUser = await User.delete(id, next)
        res.status(204).json({ deletedUser });
    } catch (err) {
        next(err)
    }
};

async function updateUser(req, res, next) {
    const id = req.params.id;
    const user = req.body;
    try {
        const updatedUser = await User.update(id, usr, next)
        res.status(200).json(updatedUser);
    } catch (err) { next(err) }
}

async function populate(req, res, next) {
    const { filter } = req.query
    try {
        const populatedUser = await User.populate(next, filter)
        res.status(200).json(populatedUser);
    } catch (err) { next(err) }

}

module.exports = {
    getUser,
    getUserById,
    deleteUser,
    updateUser,
    populate
}