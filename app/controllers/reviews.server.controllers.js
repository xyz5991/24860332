const Joi = require("joi");

const propertyIdSchema = Joi.number().integer().required();

const reviewSchema = Joi.object({
    bookingId: Joi.number().integer().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().optional()
});

const getReviews = (req, res) => {
    const { error } = propertyIdSchema.validate(req.params.property_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    return res.sendStatus(500);
};

const createReview = (req, res) => {
    const idValidation = propertyIdSchema.validate(req.params.property_id);

    if (idValidation.error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    const { error } = reviewSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

module.exports = {
    getReviews: getReviews,
    createReview: createReview
};