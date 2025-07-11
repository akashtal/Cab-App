const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authmiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 5, max: 30 })
      .withMessage("First name must be between 5 and 30 characters"),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .isLength({ max: 50 })
      .withMessage("Email must be less than 50 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authmiddleware.authUser, userController.getUserProfile);
router.get("/logout", authmiddleware.authUser, userController.logoutUser);


module.exports = router;
