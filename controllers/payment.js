// dependencies
const Razorpay =  require("razorpay");
const dotenv =  require("dotenv");
const crypto = require('crypto');

// models
const Package = require("../models/package");
const User =  require("../models/user");
const Payment =  require("../models/payment");
const Tracking = require("../models/tracking")

// service files
const userConstantsService = require("../services/constants")("user");
const packageConstantsService = require("../services/constants")("package");
const paymentConstantsService = require("../services/constants")("payment");
const trackingConstantsService = require("../services/constants")("tracking");

// configuring dotenv
dotenv.config()

// creating razorpay instance
const razorpay =  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//GET - create a razorpay payment order - /:packageId/payment/createpaymentlink/
exports.createPaymentLink = async(req, res) =>{
    try {
        // fetching package id from params
        const packageId = req.params.packageId;

        // if package id is not found in params
        if (!packageId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: packageConstantsService.MODEL_ID_NOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: packageConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching package data from database
        const package = await Package.findByPk(packageId);

        // if package does not exists
        if (!package) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: packageConstantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: packageConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fecthing user details from database
        const user =  await User.findByPk(req.user.userId);

        // if user does not exists
        if (!user) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: userConstantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: userConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // payment link expire time
        const expireTimeStamp = new Date();
        expireTimeStamp.setHours(expireTimeStamp.getHours() + 5); 
        expireTimeStamp.setMinutes(expireTimeStamp.getMinutes() + 45);

        // creating options to pass for creating payment link
        const options = {
            amount: package.cost*100,
            currency: "INR",
            accept_partial: false,
            expire_by: Math.floor(expireTimeStamp.getTime() / 1000),
            reference_id: String(package.id),
            description: "For package delivery of" + package.name,
            customer: {
                name: user.name,
                email: user.email,
                contact: String(user.phoneNumber),
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                pickUpAddress: package.pickUpAddress,
                dropAddress: package.dropAddress
            },
        };

        // creating payment link
        const paymentLink = await razorpay.paymentLink.create(options);
        
        // if cannot create payment link
        if (!paymentLink) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_CANNOT_CREATE +  " link",
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            paymentLink: paymentLink,
            message: paymentConstantsService.MODEL_CREATED + " link",
            status: {
                success: true,
                code: 200,
                message: paymentConstantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {
        
        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: paymentConstantsService.BAD_RESPONSE,
            },
        });
    }
};

//POST - verify a razorpay payment - /verifypayment/
exports.verifyPayment = async(req, res) =>{
    try {
        
        // req body sent by razorpay
        const reqBody =  req.body;

        // creating payment signature using secret key
        const expectedSignature = crypto.createHmac('sha256', process.env.VERIFY_PAYMENT_SECRET_KEY).update(JSON.stringify(reqBody)).digest('hex');

        // if payment signature not equal to signature sent by razorpay
        if (expectedSignature !== req.headers['x-razorpay-signature']) {

            //sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "un-authorized payment signature",
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE,
                        },
                    });
        };

        // fetching payment id from req body
        const paymentId = reqBody.payload.payment.entity.id;

        // fetching payment details from razorpay
        const paymentDetails = await razorpay.payments.fetch(paymentId);

        // if cannot fetch payment details
        if (!paymentDetails) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.RAZORPAY_CANNOT_FETCH,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching payment link id from req body
        const paymentLinkId =  "plink_" + paymentDetails.description.split("#")[1];

        // fetching payment link details from razorpay
        const paymentLinkDetails = await razorpay.paymentLink.fetch(paymentLinkId);

        // if cannot fetch payment link details
        if (!paymentLinkDetails) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.RAZORPAY_PAYMENT_LINK_CANNOT_FETCH,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fecthing packageId from payment link details
        const packageId =  parseInt(paymentLinkDetails.reference_id);

        // fecthing package details from database
        const package = await Package.findByPk(packageId);

        // if package does not exists
        if (!package) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: packageConstantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: packageConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching transactionId from payment details
        let transactionId;

        if(paymentDetails.acquirer_data.rrn) {
            transactionId = paymentDetails.acquirer_data.rrn;
        } else {
            transactionId = paymentDetails.acquirer_data.bank_transaction_id;
        };

        // creating payment in database
        const payment = await Payment.create({
            id: paymentDetails.id,
            orderId: paymentDetails.order_id,
            amount: paymentDetails.amount/100,
            paymentMethod: paymentDetails.method,
            transactionId: transactionId,
            userId: package.userId,
            packageId: package.id
        });

        // if cannot create payment
        if (!payment) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_CANNOT_CREATE,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // updating package details
        package.paymentId = paymentDetails.id;

        // saving package data
        const newPackage = await package.save();

        // if package is not updated
        if (!newPackage) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: packageConstantsService.MODEL_CANNOT_UPDATE,
                        status: {
                            success: false,
                            code: 400,
                            message: packageConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // creating tracking id and saving tracking details in database
        const trackingId = await Tracking.create({
            distanceToDeliver: 20.3,
            timeToDeliver: 30.2,
            paymentId: paymentDetails.id,
            packageId: package.id,
            userId: package.userId
        });

        // if cannot create tracking id
        if (!trackingId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: trackingConstantsService.MODEL_CANNOT_CREATE,
                        status: {
                            success: false,
                            code: 400,
                            message: trackingConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            message: "payment successfull",
            status: {
                success: true,
                code: 200,
                message: paymentConstantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {
        
        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: paymentConstantsService.BAD_RESPONSE,
            },
        });
    }
};

//GET - gets all payments - /payments/
exports.getPayments = async (req, res) => {
    try {

        // fetching all payments from database
        const payments = await Payment.findAll();

        // if no payments in database
        if (!payments) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: payments,
            status: {
                success: true,
                code: 200,
                message: paymentConstantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: paymentConstantsService.BAD_RESPONSE,
            },
        });
    };
};

//GET - gets all payments of user - /payments/user/
exports.getPaymentsByUser = async (req, res) => {
    try {

        // fetching user id from auth token
        const userId = req.user.userId;

        // fetching all payments of user from database
        const payments = await Payment.findAll({ where: { userId: userId } });

        // if no payments in database
        if (!payments) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: payments,
            status: {
                success: true,
                code: 200,
                message: paymentConstantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: paymentConstantsService.BAD_RESPONSE,
            },
        });
    };
};

//GET - get payment by id - /payment/:paymentId
exports.getPaymentById = async (req, res) => {
    try {

        // fetching payment id from params
        const paymentId = req.params.paymentId;

        // if payment id is not found in params
        if (!paymentId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_ID_NOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching payment data from database
        const payment = await Payment.findByPk(paymentId);

        // if payment does not exists
        if (!payment) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        }

        // sending res if req is successful
        res.status(200).send({
            data: payment,
            status: {
                success: true,
                code: 200,
                message: paymentConstantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: paymentConstantsService.BAD_RESPONSE,
            },
        });
    };
};

//GET - get payment full details - /payment/:paymentId/fulldetails
exports.getPaymentFullDetails = async (req, res) => {
    try {

        // fetching payment id from params
        const paymentId = req.params.paymentId;

        // if payment id is not found in params
        if (!paymentId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_ID_NOT_FOUND,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching payment data from database
        const payment = await razorpay.payments.fetch(paymentId);

        // if payment does not exists
        if (!payment) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: paymentConstantsService.MODEL_CANNOT_FOUND    ,
                        status: {
                            success: false,
                            code: 400,
                            message: paymentConstantsService.BAD_RESPONSE
                        }
                    });
        }

        // sending res if req is successful
        res.status(200).send({
            data: payment,
            status: {
                success: true,
                code: 200,
                message: paymentConstantsService.REQUEST_SUCCESSFUL,
            },
        });
    } catch (error) {

        //sending error res for un-successful req
        res.status(400).send({
            error: error,
            status: {
                success: false,
                code: 400,
                message: paymentConstantsService.BAD_RESPONSE,
            },
        });
    };
};