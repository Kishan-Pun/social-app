const express = require("express");
const router = express.Router();

const {
  signupValidation,
  loginValidation,
} = require("../middleware/validateAuth");

const {
  signupController,
  loginController,
} = require("../controllers/authController");

router.post("/signup", signupValidation, signupController);
router.post("/login", loginValidation, loginController);

module.exports = router;