const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')

const officeCtrl = require('../controllers/officeCtrl')

router.get('',auth.all,officeCtrl.showAll)
router.post('',auth.all,officeCtrl.create)
router.put('/:id',auth.admin,officeCtrl.moderate)
router.delete('/:id',auth.admin,officeCtrl.suppress)

module.exports = router
