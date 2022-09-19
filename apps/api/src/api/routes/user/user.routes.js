'use strict'
const { express } = require('../../../config');
const { handleNotFound } = require('../../error/400');
const { handleServerError } = require('../../error/500');
const { getUser, getUserById, populate, createUser, updateUser, deleteUser } = require('./user.handlers');
const router = express.Router()



router.get('/user', getUser);
router.get('/user/:id', getUserById)
router.get('/userAll', populate)
router.use(handleNotFound)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser)
router.use(handleServerError)

module.exports = router