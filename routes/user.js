const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const userCtrl = require('../controllers/userCtrl')

router.post('/signup',userCtrl.signup) // Sign In
router.post('/login',userCtrl.login) // Log In

router.get('/profile',auth.all,userCtrl.userProfil)
router.get('/profile/:id',auth.all,userCtrl.userProfilById)

router.put('/profile',auth.all,userCtrl.userModif)
router.put('/profile/:id',auth.admin,userCtrl.moderate)

router.delete('/',auth.all,userCtrl.selfDelete)
router.delete('/:id',auth.admin,userCtrl.delete)

module.exports = router
