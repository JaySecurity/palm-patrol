const router = require('express').Router();
const reportCtrl = require('../../controllers/api/reports');
const auth = require('../../middleware/auth');

router.get('/', reportCtrl.allOnMap);
router.get('/user/:id', reportCtrl.allForUser);
router.get('/:id', reportCtrl.getOne);
router.post('/', auth, reportCtrl.create);
router.post('/:id/comments', auth, reportCtrl.addComment);
router.put('/:id', reportCtrl.update);
router.delete('/:id', auth, reportCtrl.deleteOne);

module.exports = router;
