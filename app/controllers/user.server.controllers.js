const Joi = require("joi");

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const userIdSchema = Joi.number().integer().required();

const createAccount = (req, res) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

const login = (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

const logout = (req, res) => {
    return res.sendStatus(500);
};

const getUser = (req, res) => {
    const { error } = userIdSchema.validate(req.params.user_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid user ID"
        });
    }

    return res.sendStatus(500);
};

module.exports = {
    createAccount: createAccount,
    login: login,
    logout: logout,
    getUser: getUser
};