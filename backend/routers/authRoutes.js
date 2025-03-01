const router = require('express').Router()

const getMagicLink = require('../controllers/getMagicLink.js')
const verify = require('../controllers/verify.js')

router.get('/getMagicLink/:email', getMagicLink)
router.get('/verify', verify)

module.exports = router