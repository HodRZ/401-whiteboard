'use strict'

const { Post } = require('../../../models')

async function getPost(req, res) {
    let post = await Post.findAll();
    res.status(200).send({
        post
    })
};

async function createPost(req, res, next) {
    const newPost = req.body;
    try {
        const post = await Post.create(newPost);
        res.status(201).send(post);
    } catch (err) { next(err) }
};

async function getPostById(req, res, next) {
    const id = req.params.id;
    try {
        const post = await Post.findOne({
            where: { id: id }
        });
        res.status(200).json(post)
    } catch (err) { next(err) }
};

async function deletePost(req, res, next) {
    const id = req.params.id;
    try {
        let deletedPost = await Post.destroy({
            where: { id: id },
            returning: true
        });
        res.status(204).json({ deletedPost });
    } catch (err) {
        next(err)
    }
};

async function updatePost(req, res, next) {
    const id = req.params.id;
    const post = req.body;
    try {
        const updatedPost = await Post.update(post, {
            where: { id: id },
            returning: true,
            plain: true
        });
        res.status(200).json(updatedPost);
    } catch (err) { next(err) }
}

module.exports = {
    getPost,
    createPost,
    getPostById,
    deletePost,
    updatePost
}