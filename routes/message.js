const express = require('express')
const router = express.Router();

const messageCtrl = require('../controllers/messageCtrl')

router.get('/test',messageCtrl.test)

module.exports = router