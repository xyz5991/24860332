const Joi = require("joi");

const idSchema = Joi.number().integer().required();
const bookingSchema = Joi.object({
    propertyId: Joi.number().integer().required(),
    checkIn: Joi.date().iso().required(),
    checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required()
});

const checkAvailability = (req, res) => {
    const { error } = idSchema.validate(req.params.property_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    return res.sendStatus(500);
};

const createBooking = (req, res) => {
    const idValidation = idSchema.validate(req.params.property_id);

    if (idValidation.error) {
        return res.status(400).send({
            error_message: "Invalid property ID"
        });
    }

    const { error } = bookingSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            error_message: error.details[0].message
        });
    }

    return res.sendStatus(500);
};

const getBookings = (req, res) => {
    return res.sendStatus(500);
};

const getBooking = (req, res) => {
    const { error } = idSchema.validate(req.params.booking_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid booking ID"
        });
    }

    return res.sendStatus(500);
};

const cancelBooking = (req, res) => {
    const { error } = idSchema.validate(req.params.booking_id);

    if (error) {
        return res.status(400).send({
            error_message: "Invalid booking ID"
        });
    }

    return res.sendStatus(500);
};

module.exports = {
    checkAvailability: checkAvailability,
    createBooking: createBooking,
    getBookings: getBookings,
    getBooking: getBooking,
    cancelBooking: cancelBooking
};