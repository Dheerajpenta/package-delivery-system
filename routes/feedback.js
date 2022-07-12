// dependencies
const express = require("express");

// initializing router
const router = express.Router();

// controller files
const feedbackController = require("../controllers/feedback");

// service files
const checkUser =  require("../services/check-auth").checkUser;

// validation files
const feedbackValidator =  require("../validations/feedback");

//GET - gets all feedback - /feedback/
router.get("/", checkUser, feedbackController.getFeedbacks);

//POST - create feedback - /feedback/
router.post("/", checkUser, feedbackValidator.couponValidator(), feedbackController.createFeedback);

//GET - get feedback by user - /feedback/user/
router.get("/user", checkUser, feedbackController.getFeedbackByUser);

//DELETE - delete feedback by id - /feedback/:feedbackId
router.delete("/:feedbackId", checkUser, feedbackController.deleteFeedback);

//GET - get feedback by id - /feedback/:feedbackId/
router.get("/:feedbackId", checkUser, feedbackController.getFeedbackById);

// exporting router
module.exports = router;