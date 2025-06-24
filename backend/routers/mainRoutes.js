const getData = require('../controllers/getData')
const updateProblems = require('../controllers/updateProblems')
// const sendAll = require('../controllers/sendAll.js')
const authMW = require('../middlewares/authMW.js')
const express = require('express')
const router = express.Router()

router.get('/getData', authMW, getData)
router.post('/updateProblems', authMW, updateProblems)
// router.get('/sendall', sendAll)
router.get('/', async (req, res) => {
    res.send('CodeDaily server working perfectly!')
})

module.exports = router