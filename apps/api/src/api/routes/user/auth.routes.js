'use strict'

const { express } = require("../../../config")
const { signIn, signUp } = require("./auth.handlers")
const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)

module.exports = router