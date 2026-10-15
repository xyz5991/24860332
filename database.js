const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbDirectory = path.join(__dirname, "data");
const imagesDirectory = path.join(dbDirectory, "images");
const dbPath = path.join(dbDirectory, "errbnb.sqlite");
const schemaPath = path.join(__dirname, "schema.sql");


// Create database directory if required
if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory);
}

if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
}


// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log("Connected to SQLite database");


    initialiseDatabase();

});



function initialiseDatabase() {

    const schema = fs.readFileSync(schemaPath, "utf8");


    db.exec(schema, (err) => {

        if (err) {
            console.error(
                "Failed to initialise database:",
                err.message
            );
            return;
        }

        console.log("Database schema loaded");

    });

}



module.exports = db;