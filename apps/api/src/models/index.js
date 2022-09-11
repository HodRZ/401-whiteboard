'use strict'
const { sequelizeOption, DATABASE_URL } = require('./../config')
const { Sequelize, DataTypes } = require('sequelize');
const { Post } = require('./post.model');


const sequelize = new Sequelize(DATABASE_URL, sequelizeOption)

module.exports = {
    sequelize,
    Post: Post(sequelize, DataTypes)
}