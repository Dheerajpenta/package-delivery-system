// dependencies
const { validationResult } = require("express-validator");

// models
const Feedback = require("../models/feedback");
const User = require("../models/user");

// servic files
const constantsService =  require("../services/constants")("feedback");

//GET - gets all feedbacks - /feedback/
exports.getFeedbacks = async (req, res) => {
    try {

        // fetching all feedbacks from database
        const feedbacks = await Feedback.findAll();

        // if no feedbacks in database
        if (!feedbacks) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: feedbacks,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE,
            },
        });
    };
};

//POST - create feedback - /feedback/
exports.createFeedback = async (req, res) => {

    // validating req body
    const error =  validationResult(req);

    // if validation error 
    if (!error.isEmpty()) {

        //sending error res for un-successful req
        return  res.status(400).send({
                    error: error.array(),
                    status: {
                        success: false,
                        code: 400,
                        message: "validation error"
                    }
                });
    };

    try {

        // fetching user id from auth token
        const userId =  req.user.userId;

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "user does not exists",
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        }
        
        // req body
        const { rateExperience, feedback } =  req.body;

        // creating feedback in database
        const createdFeedback = await Feedback.create({
            rateExperience: rateExperience,
            feedback: feedback,
            userId: userId
        });

        // if feedback is not created
        if (!createdFeedback) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_CREATE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(201).send({
            data: createdFeedback,
            message: constantsService.MODEL_CREATED,
            status: {
                success: true,
                code: 201,
                message: constantsService.REQUEST_SUCCESSFUL
            }
        });

    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE,
            },
        });
    }
};

//GET - get feedback by id - /feedback/:feedbackId
exports.getFeedbackById = async (req, res) => {
    try {

        // fetching feedback id from params
        const feedbackId = req.params.feedbackId;

        // if feedback id is not found in params
        if (!feedbackId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_ID_NOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching feedback data from database
        const feedback = await Feedback.findByPk(feedbackId);

        // if feedback does not exists
        if (!feedback) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: feedback,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE,
            },
        });
    };
};

//GET - get feedback by user - /feedback/user/
exports.getFeedbackByUser = async (req, res) => {
    try {
        
        // fetching user id from auth token
        const userId = req.user.userId;

        // fetching feedback data from database
        const feedback = await Feedback.findAll({ where: { userId: userId } });
        
        // if feedback does not exists
        if (!feedback) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: feedback,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE,
            },
        });
    };
};

//DELETE - delete feedback by id - /feedback/:feedbackId
exports.deleteFeedback = async (req, res) => {
    try {

        // fetching feedback id from params
        const feedbackId = req.params.feedbackId;

        // if feedback id is not found in params
        if (!feedbackId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_ID_NOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching feedback data from database
        const feedback = await Feedback.findByPk(feedbackId);

        // if feedback does not exists
        if (!feedback) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        }

        // deleting feedback
        const isFeedbackDestroyed = await Feedback.destroy({
            where: {
              id: feedbackId
            }
        });

        // if feedback is not destroyed
        if (!isFeedbackDestroyed) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_DELETE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            deletedFeedback: feedback,
            message: constantsService.MODEL_DELETED,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE,
            },
        });
    };
};