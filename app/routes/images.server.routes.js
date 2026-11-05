const images = require("../controllers/images.server.controllers");

module.exports = function(app) {
    // GET /properties/:property_id/images - Get property images
    // POST /properties/:property_id/images - Upload property image
    app.route("/properties/:property_id/images")
        .get(images.getImages)
        .post(images.uploadImage);
};