const express = require('express')
const router = express.Router();

const commmentCtrl = require('../controllers/commentCtrl')
const auth = require('../middleware/auth')

router.get('',auth.all,commmentCtrl.getAll)
router.get('/count',auth.all,commmentCtrl.Count)
router.get('/:id',auth.all,commmentCtrl.getOne)

router.post('',auth.all,commmentCtrl.send)

router.put('/:id',auth.all,commmentCtrl.modify)

router.delete('/:id',auth.all,commmentCtrl.delete)
module.exports = router