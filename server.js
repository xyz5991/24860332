const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./docs/MMU-SE-ErrBnb-1.0.0-resolved.json');

const app = express();

app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(express.json());
app.use(cors());


// Logging
app.use((req, res, next) => {
    console.log(`##### ${req.method} ${req.path} #####`);
    next();
});
app.use(morgan('tiny'));


// Server port
const HTTP_PORT = 3333;

// Start server
app.listen(HTTP_PORT, () => {
    console.log('Server running on port: ' + HTTP_PORT);
});


// Root endpoint
app.get('/', (req, res, next) => {
    res.json({'status': 'Alive'});
});

// Other API endpoints: Links go here...
// You can uncomment the below four lines as you implement the functionality - we'll discuss this structure in week three.
// require('./app/routes/users.server.routes')(app);
// require('./app/routes/properties.server.routes')(app);
// require('./app/routes/images.server.routes')(app);
// require('./app/routes/bookings.server.routes')(app);
// require('./app/routes/reviews.server.routes')(app);


// Default response for any other request
app.use((req, res) => {
    res.sendStatus(404);
});