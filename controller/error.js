const joi = require("joi")

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