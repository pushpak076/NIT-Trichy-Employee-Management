const express = require("express");
const {
  registerStaff,
  loginStaff,
  currentStaff,
} = require("../controllers/staffController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerStaff);

router.post("/login", loginStaff);

router.get("/current", validateToken, currentStaff);

module.exports = router;
