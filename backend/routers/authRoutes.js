const router = require('express').Router()

const getMagicLink = require('../controllers/getMagicLink.js')
const verify = require('../controllers/verify.js')
const checkLogin = require('../controllers/checkLogin.js')
const logout = require('../controllers/logout.js')

router.get('/getMagicLink/:email', getMagicLink)
router.get('/verify', verify)
router.get("/checkLogin", checkLogin)
router.get("/logout", logout)

module.exports = router