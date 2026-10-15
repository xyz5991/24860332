const db = require('../database');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const imagesDir = path.join(__dirname, '..', 'data', 'images');

const getHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
};

const seedUser = (firstName, lastName, email, password) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(password, salt);
    db.run(
        'INSERT OR IGNORE INTO users (first_name, last_name, email, password, salt, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, hash, salt.toString('hex'), new Date().toISOString()]
    );
};

db.serialize(() => {

    // Disable foreign key checks while deleting
    db.run("PRAGMA foreign_keys = OFF;");

    // Delete data
    db.run("DELETE FROM reviews;");
    db.run("DELETE FROM bookings;");
    db.run("DELETE FROM property_images;");
    db.run("DELETE FROM property_amenities;");
    db.run("DELETE FROM properties;");
    db.run("DELETE FROM users;");

    // Reset AUTOINCREMENT counters
    db.run(`
        DELETE FROM sqlite_sequence
        WHERE name IN (
            'users',
            'properties',
            'bookings',
            'reviews',
            'property_images'
        );
    `);

    // Re-enable foreign keys
    db.run("PRAGMA foreign_keys = ON;");

    // Seed required test users
    seedUser('Host', 'User', 'host@example.com', 'Password1!');
    seedUser('Guest', 'User', 'guest@example.com', 'Password1!');

});

db.close(() => {
    console.log("Database reset complete.");

    // Cleanup images directory used by tests to ensure fresh state between runs
    try {
        if (fs.existsSync(imagesDir)) {
            // Remove the images directory and recreate it empty
            fs.rmSync(imagesDir, { recursive: true, force: true });
        }
        // Recreate the directory to ensure it's present for tests
        fs.mkdirSync(imagesDir, { recursive: true });
        console.log('Image directory cleaned');
    } catch (cleanupErr) {
        console.error('Failed to cleanup image directory:', cleanupErr);
    }
});