// dependencies
const twilio = require("twilio");

// function for sending otp
exports.sendOtp = async(phoneNumber) => {

    // sending otp using twilio
    return await twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
                    .verify
                    .services(process.env.TWILIO_PHONE_NUMBER_SERVICE_SID)
                    .verifications
                    .create({
                        to: `+91${phoneNumber}`,
                        channel: "sms",
                    });
};

// function for verifying otp
exports.verifyOtp = async(phoneNumber, otp) => {

    // verifying otp using twilio
    return await twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
                    .verify.services(process.env.TWILIO_PHONE_NUMBER_SERVICE_SID)
                    .verificationChecks
                    .create({
                        to: `+91${phoneNumber}`,
                        code: otp,
                    });
};