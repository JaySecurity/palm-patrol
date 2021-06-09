const router = require('express').Router();

router.post('/signup', userCtrl.create);
router.post('/login', userCtrl.login);

module.exports = router;
