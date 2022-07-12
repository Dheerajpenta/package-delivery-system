// dependencies
const { validationResult } = require("express-validator");

// models
const Coupon = require("../models/coupon");

// servic files
const constantsService =  require("../services/constants")("coupon");

//GET - gets all coupons - /coupon/
exports.getCoupons = async (req, res) => {
    try {

        // fetching all coupons from database
        const coupons = await Coupon.findAll();

        // if no coupons in database
        if (!coupons) {

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
            data: coupons,
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

//POST - create coupon - /coupon/
exports.createCoupon = async (req, res) => {

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
        
        // req body
        const { name, value } =  req.body;

        // creating coupon in database
        const coupon = await Coupon.create({
            name: name,
            value: value
        });

        // if no coupon in database
        if (!coupon) {

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
        res.status(201).send({
            data: coupon,
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

//GET - get coupon by id - /coupon/:couponId
exports.getCouponById = async (req, res) => {
    try {

        // fetching coupon id from params
        const couponId = req.params.couponId;

        // if no coupon id in params
        if (!couponId) {

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

        // fetching coupon data from database
        const coupon = await Coupon.findByPk(couponId);

        // if coupon does not exists
        if (!coupon) {

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
            data: coupon,
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

//PATCH - updating coupon by id - /coupon/:couponId
exports.updateCoupon = async (req, res) => {

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

        // fetching coupon id from params
        const couponId = req.params.couponId;

        // if no coupon id in params
        if (!couponId) {

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

        // req body
        const { value } = req.body;

        // fetching coupon data from database
        const coupon = await Coupon.findByPk(couponId);

        // if coupon does not exists
        if (!coupon) {

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

        // updating coupon data
        coupon.value = value;
    
        // saving coupon data in database
        const newCoupon = await coupon.save();

        // if new coupon not created
        if (!newCoupon) {

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
            data: newCoupon,
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

//DELETE - delete coupon by id - /coupon/:couponId
exports.deleteCoupon = async (req, res) => {
    try {

        // fetching coupon id from params
        const couponId = req.params.couponId;

        // if no coupon id in params
        if (!couponId) {

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

        // req body
        const { name } =  req.body;

        // fetching coupon data from database
        const coupon = await Coupon.findByPk(couponId);

        // if coupon does not exists
        if (!coupon) {

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

        // is coupon name doest not match
        if (name != coupon.name) {

            // sending error res for un-successful req
            return res.status(400).send({
                    errorMessage: "enter correct coupon name",
                    status: {
                        success: false,
                        code: 400,
                        message: constantsService.BAD_RESPONSE,
                    },
                });
        }

        // deleting coupon
        const isCouponDestroyed = await Coupon.destroy({
            where: {
              id: couponId
            }
        });
        
        // if coupon is not deleted
        if (!isCouponDestroyed) {

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
            deletedCoupn : coupon,
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