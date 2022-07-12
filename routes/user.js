// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const userController = require("../controllers/user");

// service files
const checkUser =  require("../services/check-auth").checkUser;

// validation files
const userValidator =  require("../validations/user");

//GET - sends all users - /user/
router.get("/", checkUser, userController.getUsers);

//PATCH - updating user by id - /user/
router.patch("/id", checkUser, userValidator.updateUserValidator(), userController.updateUser);

//PATCH - change user name - /user/id/changename/
router.patch("/id/changename", checkUser, userValidator.changeNameValidator(), userController.changeName);

//PATCH - change user email - /user/id/changeemail/
router.patch("/id/changeemail", checkUser, userValidator.changeEmailValidator(), userController.changeEmail);

//PATCH - change user password - /user/id/changepassword/
router.patch("/id/changepassword", checkUser, userValidator.changePasswordValidator(), userController.changePassword);

//GET- user by id - /user/id/
router.get("/id", checkUser, userController.getUserById);

//DELETE - delete user - /user/id/
router.delete("/id", checkUser, userController.deleteUser);

// exporting router
module.exports = router;