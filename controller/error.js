const joi = require("joi")
/**
 * ERROR VALIDATOR FOR authController.js
 * @function regValidator() -> FUNCTION TO VALIDATE USER REGISTRATION
 * @param {*} req
 * @return {*} schame.validate(req.body)
 */
const regValidator = function (req) {
    const schame = joi.object({
        username: joi.string().min(3).max(257).required().label("username"),
        email: joi.string().min(3).max(257).required().email().label("email"),
        password: joi.string().min(6).max(257).required().alphanum().label("password"),
    })
    return schame.validate(req.body);

}

module.exports = {
    regValidator
}