// models
const Tracking =  require("../models/tracking");

// servic files
const constantsService =  require("../services/constants")("tracking id");

//GET - get all trackings - /tracking/
exports.getTrackings = async (req, res) => {
    try {

        // fetching all trackings from database
        const trackings = await Tracking.findAll();

        // if trackings does not exists
        if (!trackings) {

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
            data: trackings,
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

//GET - get trackings by user - /tracking/user/
exports.getTrackingsByUser = async (req, res) => {
    try {

        // fetching user id from params
        const userId = req.user.userId;

        // fetching trackings data from database
        const trackings = await Tracking.findAll({ where:{ userId: userId } });

        // if trackings does not exists
        if (!trackings) {

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
            data: trackings,
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

//GET - get tracking by package id - /tracking/package/packageId
exports.getTrackingByPackageId = async (req, res) => {
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

        // fetching tracking data from database
        const tracking = await Tracking.findAll({ where: { packageId: packageId } });

        // if tracking does not exists
        if (!tracking) {

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
            data: tracking,
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

//GET- get tracking by id - /tracking/:trackingId
exports.getTrackingById = async (req, res) => {
    try {

        // fetching tracking id from params
        const trackingId = req.params.trackingId;

        // if tracking id is not found in params
        if (!trackingId) {

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

        // fetching tracking data from database
        const tracking = await Tracking.findByPk(trackingId);

        // if tracking does not exists
        if (!tracking) {

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
            data: tracking,
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

//PATCH - updating tracking status - /tracking/:trackingId/pickeduppackage
exports.pickedUpPackage = async (req, res) => {

    try {

        // fetching tracking id from params
        const trackingId = req.params.trackingId;

        // if tracking id is not found in params
        if (!trackingId) {

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

        // fetching tracking data from database
        const tracking = await Tracking.findByPk(trackingId);

        // if tracking does not exists
        if (!tracking) {

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

        // updating tracking data
        tracking.status = "picked up package";
    
        // saving tracking data
        const newTracking = await tracking.save();

        // if tracking is not updated
        if (!newTracking) {

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
            data: newTracking,
            message: "status of " + constantsService.MODEL_UPDATED,
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

//PATCH - updating tracking id status - /tracking/:trackingId/deliverdpackage
exports.deliverdPackage = async (req, res) => {

    try {

        // fetching tracking id from params
        const trackingId = req.params.trackingId;

        // if tracking id is not found in params
        if (!trackingId) {

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

        // fetching tracking data from database
        const tracking = await Tracking.findByPk(trackingId);

        // if tracking does not exists
        if (!tracking) {

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

        // updating tracking data
        tracking.status = "deliverd package";
    
        // saving tracking data
        const newTracking = await tracking.save();

        // if tracking is not updated
        if (!newTracking) {

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
            data: newTracking,
            message: "status of" + constantsService.MODEL_UPDATED,
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