const router = require('express').Router();
const userCtrl = require('../../controllers/api/users');

router.post('/signup', userCtrl.create);
router.post('/login', userCtrl.login);

module.exports = router;
