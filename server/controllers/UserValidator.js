const Joi = require('joi');

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6).max(25),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(25),
        type: Joi.number()
    });
    return schema.validate(user);
};

module.exports.validate = validateUser;