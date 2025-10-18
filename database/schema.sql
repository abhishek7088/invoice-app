
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE texts (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    language VARCHAR(10) NOT NULL,
    value TEXT NOT NULL,
    page VARCHAR(50) NOT NULL,
    UNIQUE(key, language)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    article_no VARCHAR(50) NOT NULL,
    product_service VARCHAR(255) NOT NULL,
    in_price DECIMAL(10, 2),
    price DECIMAL(10, 2),
    unit VARCHAR(50),
    in_stock INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample user
INSERT INTO users (email, password) 
VALUES ('test@example.com', '$2a$10$rQ2VhKXKXb3GVsXNSxnhb.xYZV8Kp0f3h9Kp0f3h9Kp0f3h9Kp0f3');

-- Insert sample texts for login page
INSERT INTO texts (key, language, value, page) VALUES
('login_title', 'en', 'Log in', 'login'),
('login_title', 'sv', 'Logga in', 'login'),
('email_label', 'en', 'Enter your email address', 'login'),
('email_label', 'sv', 'Skriv in din epost adress', 'login'),
('password_label', 'en', 'Enter your password', 'login'),
('password_label', 'sv', 'Skriv in ditt lösenord', 'login'),
('login_button', 'en', 'Log in', 'login'),
('login_button', 'sv', 'Logga in', 'login'),
('register_link', 'en', 'Register', 'login'),
('register_link', 'sv', 'Registrera dig', 'login'),
('forgot_password', 'en', 'Forgot password?', 'login'),
('forgot_password', 'sv', 'Glömt lösenord?', 'login');

-- sample Data
INSERT INTO products (article_no, product_service, in_price, price, unit, in_stock, description)
VALUES 
    ('1234567890', 'This is a test product with fifty characters this!', 900500, 1500800, 'kilometers/hour', 2500600, 'This is the description with fifty characters this'),
    ('ART001', 'Sony DSLR Camera 12345', 5000, 8500, 'pieces', 15, 'Professional camera with 24MP sensor'),
    ('ART002', 'Laptop Computer Pro', 12000, 18000, 'pieces', 8, 'High performance laptop for professionals'),
    ('ART003', 'Wireless Mouse Premium', 150, 350, 'pieces', 50, 'Ergonomic wireless mouse'),
    ('ART004', 'USB-C Cable 2m', 80, 150, 'pieces', 100, 'Fast charging USB-C cable'),
    ('ART005', 'External Hard Drive 2TB', 2000, 3500, 'pieces', 25, 'Portable storage solution'),
    ('ART006', 'Mechanical Keyboard RGB', 800, 1500, 'pieces', 30, 'Gaming keyboard with RGB lighting'),
    ('ART007', 'Monitor 27 inch 4K', 6000, 10000, 'pieces', 12, 'Ultra HD display monitor'),
    ('ART008', 'Webcam HD 1080p', 500, 900, 'pieces', 40, 'High definition webcam'),
    ('ART009', 'Headphones Noise Cancelling', 1500, 2800, 'pieces', 20, 'Premium noise cancelling headphones'),
    ('ART010', 'Phone Stand Aluminum', 200, 400, 'pieces', 60, 'Adjustable phone stand'),
    ('ART011', 'Desk Lamp LED', 350, 650, 'pieces', 35, 'Energy efficient desk lamp'),
    ('ART012', 'Notebook A4 Lined', 25, 50, 'pieces', 200, 'Professional notebook'),
    ('ART013', 'Pen Set Premium', 120, 250, 'sets', 45, 'High quality pen set'),
    ('ART014', 'Cable Organizer', 80, 150, 'pieces', 80, 'Desktop cable management'),
    ('ART015', 'Mouse Pad Extended', 180, 350, 'pieces', 55, 'Large gaming mouse pad'),
    ('ART016', 'Laptop Stand Adjustable', 400, 750, 'pieces', 28, 'Ergonomic laptop stand'),
    ('ART017', 'USB Hub 7 Port', 250, 480, 'pieces', 42, 'Powered USB hub'),
    ('ART018', 'Speakers Bluetooth', 1200, 2200, 'pairs', 18, 'Wireless bluetooth speakers'),
    ('ART019', 'Charging Station 6 Port', 600, 1100, 'pieces', 22, 'Multi-device charging station');