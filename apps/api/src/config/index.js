'use strict'

const express = require('express');
const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}

module.exports = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    AC_TOKEN: process.env.ACCESS_TOKEN_KEY,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN_KEY,
    sequelizeOption,
    express
}