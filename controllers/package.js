// dependencies
const { validationResult } = require("express-validator");

//models
const Package =  require("../models/package");
const Coupon = require("../models/coupon");

// servic files
const constantsService =  require("../services/constants")("package");

//GET - get all packages - /package/
exports.getPackage = async (req, res) => {
    try {

        // fetching all packages from database
        const packages = await Package.findAll();

        // if packages does not exists
        if (!packages) {

            // sending error res for un-successful req
            return  res.status(200).send({
                        message: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: true,
                            code: 200,
                            message: constantsService.REQUEST_SUCCESSFUL
                        }
                    });
        }

        // sending res if req is successful
        res.status(200).send({
            data: packages,
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

//GET- get package by id - /package/:packageId
exports.getPackageById = async (req, res) => {
    try {

        // fetching package id from params
        const packageId = req.params.packageId;

        // if package id is not found in params
        if (!packageId) {

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

        // fetching package data from database
        const package = await Package.findByPk(packageId);

        // if package does not exists
        if (!package) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 456489,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: package,
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

//GET - get package by user - /package/user/
exports.getPackagesByUser = async (req, res) => {

    try {

        // fetching user id from auth token
        const userId = req.user.userId;

        // fetching package data from database
        const packages = await Package.findAll({ where: { userId: userId } });

        // if package does not exists
        if (!packages) {

            // sending error res for un-successful req
            return  res.status(200).send({
                        errormessage: constantsService.MODEL_CANNOT_FOUND,
                        status: {
                            success: false,
                            code: 200,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // sending res if req is successful
        res.status(200).send({
            data: packages,
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


//POST - create package - /package/
exports.createPackage = async (req, res) => {

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
        const { name, length, breadth, weight, pickUpAddress, dropAddress, alternativePhoneNumber } =  req.body;

        // calculating cost to deliver package
        const cost = (length*breadth*weight*2);
        
        // creating package in database
        const package = await Package.create({
            name: name,
            length: length,
            breadth: breadth,
            weight: weight,
            pickUpAddress: pickUpAddress,
            dropAddress: dropAddress,
            alternativePhoneNumber: alternativePhoneNumber,
            cost: cost.toFixed(2),
            userId: req.user.userId,
        });
        
        // if package is not created
        if (!package) {

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
            data: package,
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

//POST - apply coupon to package - /package/:packageId/applyCoupon/
exports.applyCoupon = async (req, res) => {

    try {
        
        // fetching package id from params
        const packageId = req.params.packageId;

        // if package id is not found in params
        if (!packageId) {

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
        const { couponName } =  req.body;
         
        // fetching coupon details from database
        const coupon = await Coupon.findOne({ where: { name: couponName } });

        // if coupon does not exists
        if (!coupon) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "coupon does not exist",
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        }

        // fetching package data from database
        const package = await Package.findByPk(packageId);

        // if package does not exists
        if (!package) {

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

        // updating package data
        package.cost -= coupon.value;
        package.couponId = coupon.id;

        // saving package data
        const newPackage = await package.save();

        // if package is not updated
        if (!newPackage) {

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
        res.status(201).send({
            data: newPackage,
            message: "coupon applied",
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

//POST - remove coupon - /package/:packageId/removeCoupon/
exports.removeCoupon = async (req, res) => {

    try {
        
        // fetching package id from params
        const packageId = req.params.packageId;

        // if package id is not found in params
        if (!packageId) {

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

        // fetching package data from database
        const package = await Package.findByPk(packageId);

        // if package does not exists
        if (!package) {

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

        // if no coupon applied to package
        if (!package.couponId) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "no coupon selected to remove",
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // fetching coupon details from database
        const coupon = await Coupon.findByPk(package.couponId);

        // if coupon does not exists
        if (!coupon) {

            // sending error res for un-successful req
            return  res.status(400).send({
                        errormessage: "coupon does not exist",
                        status: {
                            success: false,
                            code: 400,
                            message: constantsService.BAD_RESPONSE
                        }
                    });
        };

        // updating package data
        package.cost += coupon.value;
        package.couponId = null;

        // saving package data
        const newPackage = await package.save();

        // if package is not updated
        if (!newPackage) {

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
        res.status(201).send({
            data: newPackage,
            message: "removed coupon",
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

//DELETE - delete package by id - /package/:packageId
exports.deletePackage = async (req, res) => {
    try {

        // fetching package id from params
        const packageId = req.params.packageId;

        // if package id is not found in params
        if (!packageId) {

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

        // fetching package data from database
        const package = await Package.findByPk(packageId);

        // if package does not exists
        if (!package) {

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

        // if package payemnt paid
        if (package.paymentId !== null) {

            // sending res if email already verified
            return  res.status(200).send({
                        errormessage: constantsService.MODEL_CANNOT_DELETE,
                        status: {
                            success: true,
                            code: 200,
                            message: constantsService.REQUEST_SUCCESSFUL
                        }
                    });
        };

        // deleting package
        const isPackageDestroyed = await Package.destroy({
            where: {
              id: packageId
            }
        });

        // if package is not destroyed
        if (!isPackageDestroyed) {

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
            deletedPackage: package,
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