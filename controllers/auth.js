// dependencies
const bcrypt =  require("bcrypt");
const jwt =  require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");

// service files
const emailService =  require("../services/email");
const otpService = require("../services/otp");
const constantsService =  require("../services/constants")("user");

// models
const User = require("../models/user");

// configuring dotenv
dotenv.config()

//POST - user signup - /auth/signup/
exports.signUp = async (req, res) => {

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
        
        // req body
        const { name, email, phoneNumber, password } = req.body;

        // parameters for sending email verification
        const data = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
        };
        const url = req.protocol + "://" + req.get("host") + "/user/verifyEmail/";

        // sending email for verification
        const emailResponse =  await emailService.sendVerificationEmail(data, url);
        
        // if cannot send email
        if (!emailResponse) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.EMAIL_VERIFICATION_CANNOT_SENT,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // creating user in database
        const user = await  User.create({
                                name: name,
                                email: email,
                                phoneNumber: phoneNumber,
                                password: await bcrypt.hash(password, 10),
                            });
        
        // if cannot create user
        if (!user) {

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
            data: user,
            emailVerificationResponse: emailResponse,
            message: "user created, sent email verification",
            status: {
                success: true,
                code: 201,
                message: constantsService.REQUEST_SUCCESSFUL
            }
        });
    } catch (error) {

        // sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};

//GET - user email verification - /auth/verifyemail/:token
exports.verifyEmail = async (req, res) => {

    try {
        
        // email verification token from params
        const token = req.params.token;

        // if cannot fetch token
        if (!token) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.TOKEN_NOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // decoding token
        const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION);
        
        // if decoding un-successful
        if (!decoded) {

            // sending error res for un-successful decoding
            return  res.status(400).send({
                        errormessage: constantsService.TOKEN_CANNOT_DECODE,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // updating user in database
        const user =  await User.update(
            { verified: true },
            {
                where: {
                    name: decoded.name,
                    email: decoded.email,
                    phoneNumber: decoded.phoneNumber,
                }
            }
        );
        
        // if cannot update user
        if (!user) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_UPDATE,
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
            message: constantsService.EMAIL_VERIFIED,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL
            }
        });
    } catch (error) {

        // sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};

//POST - resend user email verification - /auth/resendverifyemail/
exports.resendVerifyEmail = async (req, res) => {

    try {
        
        // req body
        const { email } = req.body;

        // fetching user data from database
        const user =  await User.findOne({
            where: {
                email: email,
            },
        });

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

        // if user already verified
        if (user.verified) {

            // sending res if email already verified
            return  res.status(200).send({
                        errormessage: constantsService.EMAIL_VERIFIED,
                        status: {
                            success: true,
                            code: 200,
                            message: constantsService.REQUEST_SUCCESSFUL
                        }
                    });
        };

        // parameters for sending email verification
        const data = {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
        };
        const url = req.protocol + "://" + req.get("host") + "/user/verifyEmail/";

        // sending email for verification
        const emailResponse =  await emailService.sendVerificationEmail(data, url);
        
        // if cannot send email
        if (!emailResponse) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.EMAIL_VERIFICATION_CANNOT_SENT,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            emailVerificationResponse: emailResponse,
            message: constantsService.EMAIL_VERIFICATION_SENT,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL
            }
        });
    } catch (error) {

        // sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};

//POST - user login via email - /auth/loginviaemail/
exports.loginViaEmail =  async(req, res) => {
    try {

        // req body
        const { email, password } = req.body;

        // fetching user data from database
        const user =  await User.findOne({
            where: {
                email: email,
            },
        });

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

        // if user not verified
        if (!user.verified) {

            // sending an error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.EMAIL_NOT_VERIFIED,
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
                        errormessage: constantsService.PASSWORD_NOT_VALID,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // creating token
        const token = jwt.sign(
            {
                userId: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            },
            process.env.LOGIN,
            {
                expiresIn: "1d"
            },
        );
        
        // sending res if req is successful 
        res.status(200).send({
            token: token,
            message: constantsService.AUTHENTICATION_SUCCESFULL,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL
            }
        });
    } catch (error) {

        // sending error res for un-successful req
        res.status(400).send({
            error: error,
            errormessage: constantsService.AUTHENTICATION_NOT_SUCCESFULL,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};

//POST - user login via phone otp - /auth/loginviaephone/
exports.loginViaPhone = async(req, res) => {

    try {
        
        // req bosy
        const { phoneNumber } = req.body;

        // fetching user data from database
        const user = await User.findOne({
            where: {
                phoneNumber: phoneNumber,
            }
        });

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

        // if user not verified
        if (!user.verified) {

            // sending an error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.VERIFY_EMAIL,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending otp
        const otpResponse = await otpService.sendOtp(phoneNumber);

        // if cannot send otp
        if (!otpResponse) {

            // sending error res for un-successful req
            return  res.status(400).send({
                error: error,
                errormessage: constantsService.OTP_NOT_SENT,
                status: {
                    success: false,
                    code: 400,
                    message: constantsService.BAD_RESPONSE
                }
            });
        };
                
        // sending res if req is successful
        res.status(200).send({
            otpResponse: otpResponse,
            message: constantsService.OTP_SENT,
            status: {
                success: true,
                code: 200,
                message: constantsService.REQUEST_SUCCESSFUL
            }
        });
    } catch (error) {

        // sending res if req is successful
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};

//POST - user phone otp verification - /auth/verifyphone/
exports.verifyPhone = async(req, res) => {

    try {
        
        // req body
        const { phoneNumber, otp } = req.body;

        // fetching user data from database
        const user = await User.findOne({
            where: {
                phoneNumber: phoneNumber,
            }
        });

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

        // if user not verified
        if (!user.verified) {

            // sending an error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.VERIFY_EMAIL,
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // response after verifying otp
        const otpResponse = await otpService.verifyOtp(phoneNumber, otp);

        // if no otp response
        if (!otpResponse) {

            // sending error res for un-successful req
            return  res.status(400).send({
                error: error,
                errormessage: constantsService.OTP_NOT_VERIFIED,
                status: {
                    success: false,
                    code: 400,
                    message: constantsService.BAD_RESPONSE
                }
            });
        };

        // if otp status approved
        if (otpResponse.status = "approved") {

            // creating token
            const token = jwt.sign(
                {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                },
                process.env.LOGIN,
                {
                    expiresIn: "1d"
                },
            );
            
            // sending res if req is successful 
            res.status(200).send({
                token: token,
                message: constantsService.OTP_VERIFIED + constantsService.AUTHENTICATION_SUCCESFULL,
                status: {
                    success: true,
                    code: 200,
                    message: constantsService.REQUEST_SUCCESSFUL
                }
            });

        // if otp response status pending
        } else {

            // sending res if req is successful
            res.status(400).send({
                message: constantsService.OTP_NOT_VALID + constantsService.AUTHENTICATION_NOT_SUCCESFULL,
                status: {
                    success: false,
                    code: 400,
                    message: constantsService.BAD_RESPONSE
                }
            });
        }
    } catch (error) {

        // sending res if req is successful
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};