const router = require('express').Router();
const reportCtrl = require('../../controllers/api/reports');
const auth = require('../../middleware/auth');

router.get('/', auth, reportCtrl.sayhi);

module.exports = router;
