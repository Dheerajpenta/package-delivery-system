// dependencies
const { check } = require("express-validator");

// models
const Feedback = require("../models/feedback");

// feedback validator function
exports.couponValidator =  () => {
    return [

        // validation for coupon name
        check("rateExperience")
            .trim()
            .notEmpty().withMessage("rate your experience with us").bail()
            .isLength({ min: 1, max: 5}).withMessage("rate your experience out of 5").bail(),

            
        // validation for coupon value
        check("feedback")
            .trim()
            .notEmpty().withMessage("please enter feedback").bail()
            .isString().withMessage("feedback should be a type string").bail(),
    ];
};