USE TamaraResDB;

-- -----------------------------------------------------
-- Categories Table
-- -----------------------------------------------------
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- Dishes Table
-- -----------------------------------------------------
CREATE TABLE dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    image_url VARCHAR(500) NULL,
    ingredients TEXT NULL,

    category_id INT NOT NULL,

    is_vegan BOOLEAN DEFAULT FALSE,
    is_vegetarian BOOLEAN DEFAULT FALSE,

    in_stock BOOLEAN DEFAULT TRUE,
    on_sale BOOLEAN DEFAULT FALSE,
    sale_price DECIMAL(10,2) NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- -----------------------------------------------------
-- Insert Categories
-- -----------------------------------------------------
INSERT INTO categories (name) VALUES
('Starters'),
('Breakfast'),
('Toasts'),
('Focaccias'),
('Sandwiches'),
('Pastas'),
('Pizzas'),
('Salads'),
('Specials'),
('Fish'),
('Desserts');

-- -----------------------------------------------------
-- Insert Dishes
-- -----------------------------------------------------
INSERT INTO dishes (
    name, price, image_url, ingredients, category_id,
    is_vegan, is_vegetarian, in_stock, on_sale, sale_price
) VALUES
('Chips', 32.00, NULL,
 'Crispy potato sticks', 
 1, FALSE, TRUE, TRUE, FALSE, NULL),

('Soup of the day', 39.00, NULL,
 'With a warm bun and butter.',
 1, FALSE, TRUE, TRUE, FALSE, NULL),

('Dreamy skewers', 52.00, NULL,
 'Crispy fingers of halloumi cheese, drizzled with teriyaki sauce.',
 1, FALSE, TRUE, TRUE, FALSE, NULL),

-- Breakfast
('Tamara Double Morning', 152.00, NULL,
 'Omelette of choice: Spanish omelette with garlic, tomatoes, a little spicy / Forest omelette with wild mushrooms and green onions...',
 2, FALSE, TRUE, TRUE, TRUE, 150.00),

('Spicy tomato shakshuka', 69.00, NULL,
 'Served with Moroccan farina, house dips and coffee or natural juice.',
 2, FALSE, TRUE, TRUE, FALSE, NULL),

-- Toasts
('Smoked salmon toast', 62.00, NULL,
 'Crispy bagel with cream cheese, mozzarella, red onion and smoked salmon.',
 3, FALSE, TRUE, TRUE, FALSE, NULL),

('Tamara Toast', 59.00, NULL,
 'Crispy bagel with cream cheese, tomato basil sauce, olives and mozzarella cheese.',
 3, FALSE, TRUE, TRUE, FALSE, NULL),

('Cheesy toast', 62.00, NULL,
 'Crispy sesame bagel with cream cheese, pesto, red onion, hard-boiled egg and olives.',
 3, FALSE, TRUE, TRUE, FALSE, NULL),

-- Pastas
('Creamy salmon fettuccine', 82.00, NULL,
 'Salmon cubes, sautéed mushrooms, cream sauce and Parmesan.',
 6, FALSE, FALSE, TRUE, TRUE, 80.00),

('Penna Wild Mushroom Cream', 66.00, NULL,
 'Mushrooms, garlic, chard, Parmesan cream and a touch of wine.',
 6, FALSE, TRUE, TRUE, FALSE, NULL),

-- Desserts
('Lemon pistachio bar', 53.00, NULL,
 'Crunchy pistachio base, lemon cream, pistachio topping and Chantilly.',
 10, FALSE, TRUE, TRUE, FALSE, NULL),

('New York cheesecake', 53.00, NULL,
 'Homemade cheesecake with vanilla cream.',
 10, FALSE, TRUE, TRUE, FALSE, NULL),

-- Pizzas
('Pizza Emilia', 59.00, NULL,
 'Tomato basil sauce, mozzarella, egg, rocket leaves and olive oil.',
 7, FALSE, TRUE, TRUE, FALSE, NULL),

('Goat pizza', 59.00, NULL,
 'Tomato sauce, mozzarella, basil pesto and goat cheese rings.',
 7, FALSE, TRUE, FALSE, FALSE, NULL),

-- Salads
('Sweet potato and walnut salad', 67.00, NULL,
 'Lettuce mix, vinaigrette, tomatoes, cucumbers, walnuts, feta and sweet potato fries.',
 8, FALSE, TRUE, TRUE, TRUE, 60.00),

('Greek Piraeus Salad', 59.00, NULL,
 'Lettuce mix, zaatar, olive oil, cherry tomatoes, cucumbers, olives and red onion.',
 8, TRUE, TRUE, TRUE, FALSE, NULL);

-- update_url_pic.sql
-- USE TamaraResDB;
-- -----------------------------------------------------
UPDATE dishes 
SET image_url='/images/dishes/chips.png' 
WHERE name='Chips';

UPDATE dishes 
SET image_url='/images/dishes/soup_of_the_day.png' 
WHERE name='Soup of the day';

UPDATE dishes 
SET image_url='/images/dishes/dreamy_skewers.png' 
WHERE name='Dreamy skewers';

UPDATE dishes 
SET image_url='/images/dishes/tamara_double_morning.png' 
WHERE name='Tamara Double Morning';

UPDATE dishes 
SET image_url='/images/dishes/spicy_tomato_shakshuka.png' 
WHERE name='Spicy tomato shakshuka';

UPDATE dishes 
SET image_url='/images/dishes/smoked_salmon_toast.png' 
WHERE name='Smoked salmon toast';

UPDATE dishes 
SET image_url='/images/dishes/tamara_toast.png' 
WHERE name='Tamara Toast';

UPDATE dishes 
SET image_url='/images/dishes/cheesy_toast.png' 
WHERE name='Cheesy toast';

UPDATE dishes 
SET image_url='/images/dishes/creamy_salmon_fettuccine.png' 
WHERE name='Creamy salmon fettuccine';

UPDATE dishes 
SET image_url='/images/dishes/penna_wild_mushroom_cream.png' 
WHERE name='Penna Wild Mushroom Cream';

UPDATE dishes 
SET image_url='/images/dishes/lemon_pistachio_bar.png' 
WHERE name='Lemon pistachio bar';

UPDATE dishes 
SET image_url='/images/dishes/new_york_cheesecake.png' 
WHERE name='New York cheesecake';

UPDATE dishes 
SET image_url='/images/dishes/pizza_emilia.png' 
WHERE name='Pizza Emilia';

UPDATE dishes 
SET image_url='/images/dishes/goat_pizza.png' 
WHERE name='Goat pizza';

UPDATE dishes 
SET image_url='/images/dishes/sweet_potato_walnut_salad.png' 
WHERE name='Sweet potato and walnut salad';

UPDATE dishes 
SET image_url='/images/dishes/greek_piraeus_salad.png' 
WHERE name='Greek Piraeus Salad';