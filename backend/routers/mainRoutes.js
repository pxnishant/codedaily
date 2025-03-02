const getData = require('../controllers/getData')
const updateUser = require('../controllers/updateUser')
const sendAll = require('../controllers/sendAll.js')
const authMW = require('../middlewares/authMW.js')
const express = require('express')
const router = express.Router()

router.get('/getdata', authMW, getData)
router.post('/updateuser', authMW, updateUser)
router.get('/sendall', sendAll)
router.get('/', async (req, res) => {
    res.send('CodeDaily server working perfectly!')
})

module.exports = router