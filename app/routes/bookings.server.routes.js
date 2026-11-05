const bookings = require("../controllers/bookings.server.controllers");

module.exports = function(app) {
    // GET /properties/:property_id/bookings - Check availability
    // POST /properties/:property_id/bookings - Create booking
    app.route("/properties/:property_id/bookings")
        .get(bookings.checkAvailability)
        .post(bookings.createBooking);

    // GET /bookings - View my bookings
    app.route("/bookings")
        .get(bookings.getBookings);

    // GET /bookings/:booking_id - View booking
    // DELETE /bookings/:booking_id - Cancel booking
    app.route("/bookings/:booking_id")
        .get(bookings.getBooking)
        .delete(bookings.cancelBooking);
};