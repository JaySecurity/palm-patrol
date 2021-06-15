const router = require('express').Router();
const reportCtrl = require('../../controllers/api/reports');
const auth = require('../../middleware/auth');

router.get('/', reportCtrl.all);
router.get('/:id', reportCtrl.getOne);
router.post('/', auth, reportCtrl.create);
router.delete('/:id', auth, reportCtrl.deleteOne);

module.exports = router;
