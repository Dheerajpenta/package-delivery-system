// dependencies
const bcrypt =  require("bcrypt");
const { validationResult } = require("express-validator");

// models
const User = require("../models/user");

// servic files
const constantsService =  require("../services/constants")("user");

//GET - gets all users - /user/
exports.getUsers = async (req, res) => {
    try {

        // fetching all users from database
        const users = await User.findAll();

        // if users does not exists
        if (!users) {

            // sending error res for un-successful req
            return  res.status(200).send({
                        message: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: true,
                            code: 200,
                            message: constantsService.REQUEST_SUCCESSFUL
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: users,
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

//GET- get user by id - /user/id/
exports.getUserById = async (req, res) => {
    try {

        // fetching user id from auth token
        const userId = req.user.userId;

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

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
            data: user,
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

//PATCH - updating user by id - /user/id/
exports.updateUser = async (req, res) => {

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
    }

    try {

        // fetching user id from auth token
        const userId = req.user.userId;

        // req body
        const { country, state, city, zipCode } = req.body;

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

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

        // updating user data
        user.country = country;
        user.state = state;
        user.city = city;
        user.zipCode = zipCode;

        // saving user data in database
        const newUser = await user.save();

        // if cannot save user to database
        if (!newUser) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        message: constantsService.MODEL_CANNOT_UPDATE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: newUser,
            message: constantsService.MODEL_UPDATED,
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
    }
};

//PATCH - change user name - /user/id/changename/
exports.changeName =  async(req, res) => {

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
    }

    try {

        // fetching user id from auth token
        const userId = req.user.userId;

        // req body
        const { newName } = req.body; 

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

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

        // updating user email
        user.name = newName;

        // saving user data in database
        const newUser = await user.save();

        // if cannot save user to database
        if (!newUser) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        message: constantsService.MODEL_CANNOT_UPDATE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: newUser,
            message: constantsService.MODEL_UPDATED,
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
    }
};

//PATCH - change user email - /user/id/changeemail/
exports.changeEmail =  async(req, res) => {

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
        const userId = req.user.userId;

        // req body
        const { newEmail, password } = req.body; 

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

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

        // if password is wrong
        if (!await bcrypt.compare(password, user.password)) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "enter valid password",
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // updating user email
        user.email = newEmail;

        // saving user data in database
        const newUser = await user.save();

        // if cannot save user to database
        if (!newUser) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        message: constantsService.MODEL_CANNOT_UPDATE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: newUser,
            message: constantsService.EMAIL_CHANGED,
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
    }
};

//PATCH - change user password - /user/id/changepassword/
exports.changePassword =  async(req, res) => {
    
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
        const userId = req.user.userId;

        // req body
        const { oldPassword, newPassword } = req.body; 

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

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

        // if old password is wrong
        if (!await bcrypt.compare(oldPassword, user.password)) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "enter valid password",
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // updating user password
        user.password = await bcrypt.hash(newPassword, 10);

        // saving user data in database
        const newUser = await user.save();

        // if cannot save user to database
        if (!newUser) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        message: constantsService.MODEL_CANNOT_UPDATE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: newUser,
            message: constantsService.PASSWORD_CHANGED,
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
    }
};

//DELETE - delete user by id - /user/id/
exports.deleteUser = async (req, res) => {
    try {

        // fetching user id from auth token
        const userId = req.user.userId;

        // req body
        const { name } =  req.body;

        // fetching user data from database
        const user = await User.findByPk(userId);

        // if user does not exists
        if (!user) {

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

        // is user name doest not match
        if (name != user.name) {

            // sending error res for un-successful req
            return res.status(400).send({
                    errorMessage: "enter correct name",
                    status: {
                        success: false,
                        code: 400,
                        message: constantsService.BAD_RESPONSE,
                    },
                });
        }

        // deleting user
        const isUserDestroyed = await User.destroy({
            where: {
              id: userId,
              name: name,
            }
        });

        // if cannot delete user
        if (!isUserDestroyed) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        message: constantsService.MODEL_CANNOT_DELETE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            deletedUser: user,
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