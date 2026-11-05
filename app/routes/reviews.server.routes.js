const reviews = require("../controllers/reviews.server.controllers");

module.exports = function(app) {
    // GET /properties/:property_id/reviews - View reviews
    // POST /properties/:property_id/reviews - Leave a review
    app.route("/properties/:property_id/reviews")
        .get(reviews.getReviews)
        .post(reviews.createReview);
};