// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const paymentController =  require("../controllers/payment");

// service files
const checkUser =  require("../services/check-auth").checkUser;

//POST - create payment order - /package/:packageId/payment/createpaymentorder/
router.get("/:packageId/createpaymentlink", checkUser, paymentController.createPaymentLink);

//POST - verify a razorpay payment - /verifypayment/
router.post("/verifypayment", /*checkUser,*/ paymentController.verifyPayment);

//GET - gets all payments - /payments/
router.get("/", checkUser, paymentController.getPayments);

//GET - gets all payments of user - /payments/user/
router.get("/user", checkUser, paymentController.getPaymentsByUser);

//GET - get payment by id - /payment/:paymentId
router.get("/:paymentId", checkUser, paymentController.getPaymentById);

//GET - get payment full details - /payment/:paymentId/fulldetails
router.get("/:paymentId/fulldetails", checkUser, paymentController.getPaymentFullDetails);

// exporting router
module.exports = router;