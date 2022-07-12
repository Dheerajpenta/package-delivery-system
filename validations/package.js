// dependencies
const { check } = require("express-validator");

// models
const User = require("../models/user");

// package validator function
exports.packageValidator =  () => {
    return [

        // validation for name
        check("name")
            .trim()
            .notEmpty().withMessage("please enter name").bail()
            .isString().withMessage("pickup address should be of type string").bail()
            .isLength({ min: 4}).withMessage("name should have minimum 4 characters").bail(),

            
        // validation for length
        check("length")
            .trim()
            .notEmpty().withMessage("please enter length").bail()
            .isNumeric().withMessage("length should be a type number").bail(),

        // validation for breadth
        check("breadth")
            .trim()
            .notEmpty().withMessage("please enter breadth").bail()
            .isNumeric().withMessage("breadth should be a type number").bail(),

        // validation for weight
        check("weight")
            .trim()
            .notEmpty().withMessage("please enter weight").bail()
            .isNumeric().withMessage("weight should be a type number").bail(),

        // validation for pickUpAddress
        check("pickUpAddress")
            .trim()
            .notEmpty().withMessage("please enter pickup address").bail()
            .isString().withMessage("pickup address should be of type string").bail()
            .isLength({ min: 4}).withMessage("pickup address should have minimum 4 characters").bail(),

        // validation for dropAddress
        check("dropAddress")
            .trim()
            .notEmpty().withMessage("please enter drop address").bail()
            .isString().withMessage("drop address should be of type string").bail()
            .isLength({ min: 4}).withMessage("drop address should have minimum 4 characters").bail(),

        // validation for user phone number
        check("alternativePhoneNumber")
            .trim()
            .matches(/^[6-9]\d{9}$/).withMessage("please enter a valid alternative phone number").bail()
            .custom(async(val) => {

                // fetching user details from database
                const user = await User.findOne({ where:{ phoneNumber: val } });

                // if user exists reject promise
                 if (user) { return Promise.reject("phone number already exists")}
            }),
    ];
};