// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const trackingController = require("../controllers/tracking");

// service files
const checkUser =  require("../services/check-auth").checkUser;

//GET - get all trackings - /tracking/
router.get("/", checkUser, trackingController.getTrackings);

//GET - get trackings by user - /tracking/user/
router.get("/user", checkUser, trackingController.getTrackingsByUser);

//GET - get tracking by package id - /tracking/:packageId
router.get("/package/:packageId", checkUser, trackingController.getTrackingByPackageId);

//GET- get tracking by id - /tracking/:trackingId
router.get("/:trackingId", checkUser, trackingController.getTrackingById);

//PATCH - updating tracking status - /tracking/:trackingId/pickeduppackage
router.patch("/:trackingId/pickeduppackage", checkUser, trackingController.pickedUpPackage);

//PATCH - updating tracking status - /tracking/:trackingId/deliverdpackage
router.patch("/:trackingId/deliverdpackage", checkUser, trackingController.deliverdPackage);

// exporting router
module.exports = router;