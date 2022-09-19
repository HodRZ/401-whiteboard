'use strict'
const { express } = require('../../../config');
const { handleNotFound } = require('../../error/400');
const { handleServerError } = require('../../error/500');
const { getCmnt, createCmnt, getCmntById, deleteCmnt, updateCmnt, populate } = require('./comment.handler')
const router = express.Router()



router.get('/comment', getCmnt);
router.get('/comment/:id', getCmntById)
router.get('/commentAll', populate)
router.use(handleNotFound)
router.post('/post/:id/comment', createCmnt)
router.delete('/comment/:id', deleteCmnt)
router.put('/comment/:id', updateCmnt)
router.use(handleServerError)

module.exports = router