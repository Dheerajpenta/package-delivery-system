// dependencies
const { check } = require("express-validator");

// models
const Coupon = require("../models/coupon");

// coupon validator function
exports.couponValidator =  () => {
    return [

        // validation for coupon name
        check("name")
            .trim()
            .notEmpty().withMessage("please enter coupon name").bail()
            .isLength({ min: 4}).withMessage("coupon name should have minimum 4 characters").bail()
            .custom(async(val) => {

                // fetching coupon details from database
                const coupon = await Coupon.findOne({ where:{ name: val } });

                // if coupon exists reject promise
                 if (coupon) { return Promise.reject("coupon name already exists")}
            }),

            
        // validation for coupon value
        check("value")
            .trim()
            .notEmpty().withMessage("please enter coupon value").bail()
            .isNumeric().withMessage("coupon value should be a type number").bail(),
    ];
};

// update coupon validator function
exports.updateCouponValidator =  () => {
    return [
            
        // validation for coupon value
        check("value")
            .trim()
            .optional()
            .isNumeric().withMessage("coupon value should be a type number").bail(),
    ];
};