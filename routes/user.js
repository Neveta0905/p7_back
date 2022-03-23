const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const userCtrl = require('../controllers/userCtrl')

router.post('/signup',userCtrl.signup) // Sign In
router.post('/login',userCtrl.login) // Log In

router.get('/profile',auth,userCtrl.userProfil)
router.get('/profile/:id',auth,userCtrl.userProfilById)
router.get('/test',userCtrl.test)

module.exports = router
