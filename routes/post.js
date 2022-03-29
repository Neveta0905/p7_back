const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const postCtrl = require('../controllers/postCtrl')

router.get('',auth.all,postCtrl.getAll)
router.get('/:id',auth.all,postCtrl.getOne)
router.post('',auth.all,postCtrl.create)
router.put('/:id',auth.admin,postCtrl.moderate)
router.delete('/:id',auth.all,postCtrl.delete)

module.exports = router
