const properties = require("../controllers/properties.server.controllers");

module.exports = function(app) {
    // GET /amenities - Get list of amenities
    app.route("/amenities")
        .get(properties.getAmenities);

    // GET /properties - Search properties
    // POST /properties - Create property
    app.route("/properties")
        .get(properties.getProperties)
        .post(properties.createProperty);

    // GET /properties/:property_id - View property details
    // PATCH /properties/:property_id - Update property
    app.route("/properties/:property_id")
        .get(properties.getProperty)
        .patch(properties.updateProperty);
};