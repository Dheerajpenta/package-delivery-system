// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const packageController = require("../controllers/package");

// service files
const checkUser =  require("../services/check-auth").checkUser;

// validation files
const packageValidator =  require("../validattions/package");

//GET - gets all package - /package/
router.get("/", checkUser, packageController.getPackage);

//GET - get package by user - /package/user/
router.get("/user", checkUser, packageController.getPackagesByUser);

//POST - create package - /package/
router.post("/", checkUser, packageValidator.packageValidator(), packageController.createPackage);

//POST - apply coupon to package - /package/:packageId/applyCoupon/
router.post("/:packageId/applyCoupon", checkUser, packageController.applyCoupon);

//POST - remove coupon - /package/:packageId/removeCoupon/
router.get("/:packageId/removeCoupon", checkUser, packageController.removeCoupon);

//DELETE - delete package by id - /package/:packageId
router.delete("/:packageId", checkUser, packageController.deletePackage);

//GET - get package by id - /package/:packageId/
router.get("/:packageId", checkUser, packageController.getPackageById);

// exporting router
module.exports = router;