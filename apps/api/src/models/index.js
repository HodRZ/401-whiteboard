'use strict'
const { sequelizeOption, DATABASE_URL } = require('./../config')
const { Sequelize, DataTypes } = require('sequelize');
const { post } = require('./post.model');
const { comment } = require('./comment.model');
const { GenericRoutes } = require('../api/collection/GenericRoutes');
const { bcrypt, zlib } = require('../config/Utils');
const { User } = require('./User.model');


const sequelize = new Sequelize(
    DATABASE_URL,
    // sequelizeOption
)

const userModel = User(sequelize, DataTypes, zlib, bcrypt)
const postModel = post(sequelize, DataTypes, zlib)
const commentModel = comment(sequelize, DataTypes, zlib)

userModel.hasMany(postModel, { as: 'posts' })
postModel.belongsTo(userModel)

userModel.hasMany(commentModel, { as: 'comments' })
commentModel.belongsTo(userModel)

postModel.hasMany(commentModel, { as: 'comments' })
commentModel.belongsTo(postModel)

const userCollection = new GenericRoutes(userModel)
const postCollection = new GenericRoutes(postModel)
const commentCollection = new GenericRoutes(commentModel)

module.exports = {
    sequelize,
    Post: postCollection,
    Cmnt: commentCollection,
    User: userCollection,
    commentModel,
    userModel
}