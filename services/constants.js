// consants function
const constants = (model) => {
    return {

        REQUEST_SUCCESSFUL : "request successful",
        BAD_RESPONSE : "bad request, request un-successful",

        EMAIL_VERIFICATION_SENT : "email verification sent successfully",
        EMAIL_VERIFICATION_CANNOT_SENT : "cannot send email verification",
        EMAIL_VERIFIED : "email verified successfully",
        EMAIL_NOT_VERIFIED : "cannot verify email address",
        EMAIL_CHANGED : "email changed sucessfully",

        PASSWORD_CHANGED : "password changed sucessfully",
        PASSWORD_NOT_VALID : "enter valid password",

        OTP_SENT : "otp sent succesfully",
        OTP_NOT_SENT : "cannot send otp",
        OTP_VERIFIED : "otp verified successfully",
        OTP_NOT_VERIFIED : "cannot verify otp",
        OTP_NOT_VALID : "enter valid otp",

        AUTHENTICATION_SUCCESFULL : `${model} authentication successful`,
        AUTHENTICATION_NOT_SUCCESFULL : `${model} authentication un-successful`,

        USER_AUTHORIZED : "user authorizated to perform request",
        USER_NOT_AUTHORIZED : "user is not authorizated to perform request",

        MODEL_CREATED : `created ${model}`,
        MODEL_CANNOT_CREATE : `cannot create ${model}`,
        MODEL_CANNOT_FOUND : `cannot found ${model}`,
        MODEL_UPDATED : `${model} updated`,
        MODEL_CANNOT_UPDATE : `cannot update ${model}`,
        MODEL_DELETED : `${model} deleted`,
        MODEL_CANNOT_DELETE : `cannot delete ${model}`,
        MODEL_ID_NOT_FOUND : `enter ${model} id, cannot find ${model} id`,

        TOKEN_NOT_FOUND : "token is not found",
        TOKEN_CANNOT_DECODE : "token cannot be decoded, enter valid token",
    };
};

// exporting constanta
module.exports = constants;