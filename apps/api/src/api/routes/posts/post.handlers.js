'use strict'

const { Post } = require('../../../models')

async function getPost(req, res, next) {
    try {
        const post = await Post.get(next);
        res.status(200).json({
            post
        })
    } catch (e) {
        console.error(e)
    }
};

async function createPost(req, res, next) {
    const newPost = req.body;
    try {
        const post = await Post.create(newPost, next);
        res.status(201).json(post);
    } catch (err) { next(err) }
};

async function getPostById(req, res, next) {
    const id = req.params.id;
    const { filter } = req.query
    try {
        const post = await Post.getPopulated(id, next, filter);
        res.status(200).json(post)
    } catch (err) { next(err) }
};

async function deletePost(req, res, next) {
    const id = req.params.id;
    try {
        let deletedPost = await Post.delete(id, next)
        res.status(204).json({ deletedPost });
    } catch (err) {
        next(err)
    }
};

async function updatePost(req, res, next) {
    const id = req.params.id;
    const post = req.body;
    try {
        const updatedPost = await Post.update(id, post, next)
        res.status(200).json(updatedPost);
    } catch (err) { next(err) }
}

async function populate(req, res, next) {
    const { filter } = req.query
    try {
        const populatedPosts = await Post.populate(next, filter)
        res.status(200).json(populatedPosts);
    } catch (err) { next(err) }

}

module.exports = {
    getPost,
    createPost,
    getPostById,
    deletePost,
    updatePost,
    populate
}