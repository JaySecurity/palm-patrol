const router = require('express').Router();
const reportCtrl = require('../../controllers/api/reports');
const auth = require('../../middleware/auth');

router.get('/', auth, reportCtrl.all);
router.post('/', auth, reportCtrl.create);

module.exports = router;
