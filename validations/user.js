// dependencies
const { check } = require("express-validator");

// models
const User =  require("../models/user");

// update user validator function
exports.updateUserValidator =  () => {
    return [

        // validation for user name
        check("name")
            .trim()
            .optional()
            .notEmpty().withMessage("please enter name").bail()
            .isLength({ min: 4}).withMessage("name should have minimum 4 characters").bail()
            .custom(async(val) => {

                // fetching user details from database
                const user = await User.findOne({ where:{ name: val } });

                // if user exists reject promise
                 if (user) { return Promise.reject("name already exists")}
            }),

            
        // validation for user country
        check("country")
            .trim()
            .optional(),

        
        // validation for user state
        check("state")
            .trim()
            .optional(),

        
        // validation for user city
        check("city")
            .trim()
            .optional(),

        
        // validation for user address zip code
        check("zipCode")
            .trim()
            .optional()
            .matches(/^[1-9][0-9]{5}$/).withMessage("enter valid zip code").bail(),
    ];
};

// change user name validator function
exports.changeNameValidator =  () => {
    return [

        // validation for user email
        check("newName")
            .trim()
            .optional()
            .notEmpty().withMessage("please enter name").bail()
            .isLength({ min: 4}).withMessage("name should have minimum 4 characters").bail()
            .custom(async(val) => {

                // fetching user details from database
                const user = await User.findOne({ where:{ name: val } });

                // if user exists reject promise
                if (user) { return Promise.reject("name already exists")}
            }),
    ];
};

// change user email validator function
exports.changeEmailValidator =  () => {
    return [

        // validation for user email
        check("newEmail")
            .trim()
            .notEmpty().withMessage("please enter new email").bail()
            .isEmail().withMessage("please enter a valid email").bail()
            .custom(async(val) => {

                // fetching user details from database
                const user = await User.findOne({ where:{ email: val } });

                // if user exists reject promise
                 if (user) { return Promise.reject("email already exists")}
            }),

            
        // validation for user password
        check("password")
            .trim()
            .notEmpty().withMessage("please enter password").bail(),
    ];
};

// change user password validator function
exports.changePasswordValidator =  () => {
    return [

        // validation for user old password
        check("oldPassword")
            .trim()
            .notEmpty().withMessage("please enter old password").bail(),

            
        // validation for user password
        check("newPassword")
            .trim()
            .notEmpty().withMessage("please enter new password").bail()
            .isLength({ min: 8}).withMessage("new password should have minimum 8 characters").bail()
            .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("new assword must contain 8 characters and include one lowercase, one uppercase, one number").bail(),
    ];
};