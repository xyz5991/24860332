const Joi = require("joi");


const propertyIdSchema = Joi.number().integer().required();

const searchSchema = Joi.object({
    city: Joi.string(),
    maxPrice: Joi.number().min(0),
    guests: Joi.number().integer().positive(),
    ownedBy: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    offset: Joi.number().integer().min(0)
});

const propertySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    post_code: Joi.string().required(),
    country: Joi.string().required(),
    price_per_night: Joi.number().min(0).required(),
    max_guests: Joi.number().integer().positive().required(),
    bedrooms: Joi.number().integer().min(0).required(),
    bathrooms: Joi.number().integer().min(0).required(),
    amenities: Joi.array().items(Joi.number().integer()).required()
});

const updateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    post_code: Joi.string(),
    country: Joi.string(),
    price_per_night: Joi.number().min(0),
    max_guests: Joi.number().integer().positive(),
    bedrooms: Joi.number().integer().min(0),
    bathrooms: Joi.number().integer().min(0)
}).min(1);

const getAmenities = (req, res) => {
    return res.sendStatus(500);
};

const getProperties = (req, res) => {
    const { error } = searchSchema.validate(req.query);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

const createProperty = (req, res) => {
    const { error } = propertySchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

const getProperty = (req, res) => {
    const { error } = propertyIdSchema.validate(req.params.property_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    return res.sendStatus(500);
};

const updateProperty = (req, res) => {
    const idValidation = propertyIdSchema.validate(req.params.property_id);

    if (idValidation.error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    const { error } = updateSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

module.exports = {
    getAmenities: getAmenities,
    getProperties: getProperties,
    createProperty: createProperty,
    getProperty: getProperty,
    updateProperty: updateProperty
};