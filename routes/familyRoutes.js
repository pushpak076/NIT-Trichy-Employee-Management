const express = require("express");
const router = express.Router();
const {
  getFamilys,
  createFamily,
  getFamily,
  updateFamily,
  deleteFamily,
} = require("../controllers/familyController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getFamilys).post(createFamily);
router.route("/:id").get(getFamily).put(updateFamily).delete(deleteFamily);

module.exports = router;
