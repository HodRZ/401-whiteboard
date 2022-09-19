'use strict'

const userRoutes = require('./user/user.routes')
const signinRoute = require('./user/auth.routes')
const commentRoute = require('./comments/comment.routes')
const postRoute = require('./posts/post.routes')


module.exports = {
    userRoutes,
    signinRoute,
    commentRoute,
    postRoute
}