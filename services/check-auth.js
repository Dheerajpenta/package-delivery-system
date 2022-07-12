// dependencies
const jwt =  require("jsonwebtoken");
const dotenv = require("dotenv");

// service files
const constantsService = require("./constants")("user");

// configuring dotenv
dotenv.config()

// function to check user authorization
exports.checkUser = async(req, res, next) => {
    try {
        
        // fetching the token from headers
        const token = await req.headers.authorization.split(" ")[1];

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

        // decoding the token
        const decoded = jwt.verify(token, process.env.LOGIN);

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
        }

        // storing the information in req.user
        req.user =  {
            userId: decoded.userId,
            name: decoded.name,
            email: decoded.email,
            phoneNumber: decoded.phoneNumber
        };

        // processing next
        next();
    } catch (error) {

        // sending error res for un-successful req
        res.status(400).send({
            message: constantsService.USER_NOT_AUTHORIZED,
            status: {
                success: false,
                code: 400,
                message: constantsService.BAD_RESPONSE
            }
        });
    }
};