// consants function
const constants = (model) => {
    return {

        REQUEST_SUCCESSFUL : "request successful",
        BAD_RESPONSE : "bad request, request un-successful",

        PASSWORD_CHANGED : "password changed sucessfully",
        PASSWORD_NOT_VALID : "enter valid password",

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
    };
};

// exporting constanta
module.exports = constants;