-- ErrBnB DDL --
-- Author: Ash Williams
-- This script creates the database schema for ErrBnB, a fictional rental platform.

-- Users
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    salt text NOT NULL,
    session_token text,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT email_unique UNIQUE (email)
);

-- Properties
CREATE TABLE IF NOT EXISTS properties (
    property_id INTEGER PRIMARY KEY AUTOINCREMENT,
    host_id INTEGER NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    post_code text NOT NULL,
    country text NOT NULL,
    price_per_night REAL NOT NULL CHECK (price_per_night >= 0),
    max_guests INTEGER NOT NULL CHECK (max_guests > 0),
    bedrooms INTEGER NOT NULL CHECK (bedrooms >= 0),
    bathrooms INTEGER NOT NULL CHECK (bathrooms >= 0),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Property Images
CREATE TABLE IF NOT EXISTS property_images (
    image_id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    image_url text NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    property_id INTEGER NOT NULL,
    guest_id INTEGER NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    total_price REAL NOT NULL CHECK (total_price >= 0),
    status text CHECK (status IN ('Confirmed', 'Cancelled')) NOT NULL DEFAULT 'Confirmed',
    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (guest_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
    booking_id INTEGER PRIMARY KEY, -- Each review is linked to a specific booking
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (guest_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Amenities
CREATE TABLE IF NOT EXISTS amenities (
    amenity_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Property Amenities
CREATE TABLE IF NOT EXISTS property_amenities (
    property_id INTEGER NOT NULL,
    amenity_id INTEGER NOT NULL,
    PRIMARY KEY (property_id, amenity_id),
    FOREIGN KEY (property_id) REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES amenities(amenity_id) ON DELETE CASCADE
);

-- Add amenities to the amenities table
INSERT OR IGNORE INTO amenities (name) VALUES
('Wi-Fi'),
('Air Conditioning'),
('Heating'),
('Kitchen'),
('Washer'),
('Dryer'),
('Free Parking'),
('Pool'),
('Hot Tub'),
('TV'),
('Breakfast'),
('Pets Allowed'),
('Gym'),
('Elevator'),
('Wheelchair Accessible'),
('Fireplace'),
('Smoke Detector'),
('Carbon Monoxide Detector'),
('First Aid Kit'),
('Essentials'),
('Shampoo'),
('Hangers'),
('Hair Dryer'),
('Iron'),
('Laptop Friendly Workspace'),
('Private Entrance'),
('Patio or Balcony'),
('Garden or Backyard'),
('BBQ Grill'),
('Beachfront'),
('Lake Access'),
('Mountain View'),
('City View'),
('Ski-in/Ski-out'),
('Buzzer/Wireless Intercom'),
('24-hour Check-in'),
('Self Check-in'),
('Long-term Stays Allowed'),
('Breakfast Included'),
('Luggage Drop-off Allowed');
