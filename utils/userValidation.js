const Joi = require('joi')
const userRegisterValidate = (req, res, next) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().alphanum().min(7).required(),
        phone_number: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const userLoginValidate = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(7).required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
}


const userProfileUpdateValidate = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
}

// const passwordResetValidate = (req, res, next) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required()
//     });
//     const { error, value } = schema.validate(req.body);
//     if (error) {
//         return res.status(400).json({ message: "Bad request", error });
//     }
//     next();
// }
module.exports = { userRegisterValidate, userLoginValidate, userProfileUpdateValidate };