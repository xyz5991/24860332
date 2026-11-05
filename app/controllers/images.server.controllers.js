const Joi = require("joi");

const propertyIdSchema = Joi.number().integer().required();
const imageTypeSchema = Joi.string().valid("image/png", "image/jpeg").required();

const getImages = (req, res) => {
    const { error } = propertyIdSchema.validate(req.params.property_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    return res.sendStatus(500);
};

const uploadImage = (req, res) => {
    const idValidation = propertyIdSchema.validate(req.params.property_id);

    if (idValidation.error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    const { error } = imageTypeSchema.validate(
        req.headers["content-type"]
    );

    if (error) {
        return res.status(400).send({
            error_message: "Image must be JPEG or PNG"
        });
    }

    return res.sendStatus(500);
};

module.exports = {
    getImages: getImages,
    uploadImage: uploadImage
};