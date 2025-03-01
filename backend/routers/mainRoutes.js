const getData = require('../controllers/getData')
const updateUser = require('../controllers/updateUser')
const sendAll = require('../controllers/sendAll.js')
const express = require('express')
const router = express.Router()

router.get('/getdata', getData)
router.post('/updateuser', updateUser)
router.get('/sendall', sendAll)
router.get('/', async (req, res) => {
    res.send('CodeDaily server working perfectly!')
})

module.exports = router