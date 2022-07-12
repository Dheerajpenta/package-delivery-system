// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const couponController = require("../controllers/coupon");

// service files
const checkUser =  require("../services/check-auth").checkUser;

// validation files
const couponValidator =  require("../validattions/coupon");

//GET - gets all coupons - /coupon/
router.get("/", checkUser, couponController.getCoupons);

//POST - create coupon - /coupon/
router.post("/", checkUser, couponValidator.couponValidator(), couponController.createCoupon);
 
//GET - get coupon by id - /coupon/:couponId/
router.get("/:couponId", checkUser, couponController.getCouponById);

//PATCH - updating coupon by id - /coupon/:couponId
router.patch("/:couponId", checkUser, couponValidator.updateCouponValidator(), couponController.updateCoupon);

//DELETE - delete coupon by id - /coupon/:couponId
router.delete("/:couponId", checkUser, couponController.deleteCoupon);

// exporting router
module.exports = router;