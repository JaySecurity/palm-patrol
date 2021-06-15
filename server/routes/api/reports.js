const router = require("express").Router();
const reportCtrl = require("../../controllers/api/reports");
const auth = require("../../middleware/auth");

router.get("/", auth, reportCtrl.all);
router.post("/", auth, reportCtrl.create);

router.get("/", auth, reportCtrl.all);
// router.delete("/:id/delete", auth, reportCtrl.deleteReport);
router.delete("/delete", function (req, res) {
  res.send("deleted");
});
module.exports = router;
