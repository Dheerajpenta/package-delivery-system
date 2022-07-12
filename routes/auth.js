// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const authController = require("../controllers/auth");

// validation files
const signUpUserValidator =  require("../validattions/user").signUpUserValidator;

//POST - user signup - /auth/signup/
router.post("/signup", signUpUserValidator(), authController.signUp);

//POST - resend user email verification - /auth/resendverifyemail/
router.post("/resendverifyemail", authController.resendVerifyEmail);

//GET - user email verification - /auth/verifyemail/:token
router.get("/verifyemail/:token", authController.verifyEmail);

//POST - user login via email - /auth/loginviaemail/
router.post("/loginviaemail", authController.loginViaEmail);

//POST - user login via phone otp - /auth/loginviaephone/
router.post("/loginviaphone", authController.loginViaPhone);

//POST - user phone otp verification - /auth/verifyphone/
router.post("/verifyphone", authController.verifyPhone);

// exporting router
module.exports = router;