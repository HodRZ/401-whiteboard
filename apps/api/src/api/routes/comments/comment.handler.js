'use strict'

const { Cmnt } = require('../../../models')

async function getCmnt(req, res, next) {
    try {
        const comments = await Cmnt.get();
        res.status(200).json({
            comments
        })
    } catch (e) {
        next(e)
    }
};

async function createCmnt(req, res, next) {
    const PostId = req.params.id
    req.body.PostId = PostId
    const newCmnt = req.body;
    try {
        const comment = await Cmnt.create(newCmnt);
        res.status(201).json(comment);
    } catch (err) { next(err) }
};

async function getCmntById(req, res, next) {
    const id = req.params.id;
    try {
        const comment = await Cmnt.get(id);
        res.status(200).json(comment)
    } catch (err) { next(err) }
};

async function deleteCmnt(req, res, next) {
    const id = req.params.id;
    try {
        let deletedCmnt = await Cmnt.delete(id)
        res.status(204).json({ deletedCmnt });
    } catch (err) {
        next(err)
    }
};

async function updateCmnt(req, res, next) {
    const id = req.params.id;
    const Cmnt = req.body;
    try {
        const updatedCmnt = await Cmnt.update(id, Cmnt)
        res.status(200).json(updatedCmnt);
    } catch (err) { next(err) }
}

async function populate(req, res, next) {
    const { filter } = req.query
    try {
        const populatedCmnts = await Cmnt.populate(filter)
        res.status(200).json(populatedCmnts);
    } catch (err) { next(err) }

}

module.exports = {
    getCmnt,
    createCmnt,
    getCmntById,
    deleteCmnt,
    updateCmnt,
    populate
}