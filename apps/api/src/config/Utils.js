'use strict'

const cookieParser = require('cookie-parser')
const zlib = require('node:zlib')
const bcrypt = require('bcrypt');
const base64 = require('base-64')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const omit = require('lodash/omit')
const jwt = require('jsonwebtoken')

module.exports = {
    bcrypt,
    zlib,
    base64,
    helmet,
    morgan,
    cors,
    omit,
    jwt,
    cookieParser
}