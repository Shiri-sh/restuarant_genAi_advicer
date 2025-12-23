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
-- focaccias
('Coal focaccia', 64.00, '/images/dishes/coal_focaccia.png',
 'Grilled eggplant, placed on crispy focaccia with a drizzle of millstone-ground tahini, date syrup, feta cheese shavings, and basil.', 
 4, FALSE, TRUE, TRUE, TRUE, 58.00),
 -- Sandwiches
 ('Smoked salmon sandwich', 62.00, '/images/dishes/smoked_salmon_sandwich.png',
 'Cream cheese, smoked salmon, red onion, lettuce and tomato slices.', 
 5, FALSE, FALSE, TRUE, FALSE, NULL),
 ('Dream sandwich', 59.00, '/images/dishes/dream_sandwich.png',
 'Basil pesto, lettuce, cream cheese, tomato slices, and burnt halloumi cheese.',
 5, FALSE, TRUE, TRUE, FALSE, NULL),
 ('Tunisian sandwich', 59.00, '/images/dishes/tunisian_sandwich.png',
 'Harissa aioli, pickled lemon, hot hard-boiled egg, hot sliced ​​potato, tuna and pickled cucumber.',
 5, TRUE, TRUE, TRUE, TRUE, 50.00),
 ('Omelet sandwich', 49.00, '/images/dishes/omelet_sandwich.png',
 'Cream cheese, vegetable omelet, lettuce, cucumber and tomato slices.',
 5, FALSE, TRUE, TRUE, FALSE, NULL),
 -- Fish
 ('Sea morals', 134.00, '/images/dishes/sea_morals.png',
 'Served with green mashed potatoes, green beans, broccoli florets and red wine sauce.',
 10, FALSE, FALSE, TRUE, FALSE, NULL),
  ('FISH & CHIPS', 89.00, '/images/dishes/fish_and_chips.png',
 'Cod fish pieces coated in panko crumbs, on a bed of crispy steak fries, served with amba aioli.',
 10, FALSE, FALSE, TRUE, TRUE, 79.00),
  ('Japanese sea bass', 49.00, '/images/dishes/japanese_sea_bass.png',
 'A meaty whole fish, grilled, with the aroma of garlic and olive oil, accompanied by oven-roasted root vegetables and sauce...',
 10, FALSE, FALSE, TRUE, FALSE, NULL),

-- Starters
('Chips', 32.00, '/images/dishes/chips.png',
 'Crispy potato sticks', 
 1, FALSE, TRUE, TRUE, FALSE, NULL),
('Soup of the day', 39.00, '/images/dishes/soup_of_the_day.png',
 'With a warm bun and butter.',
 1, FALSE, TRUE, TRUE, FALSE, NULL),
('Dreamy skewers', 52.00, '/images/dishes/dreamy_skewers.png',
 'Crispy fingers of halloumi cheese, drizzled with teriyaki sauce.',
 1, FALSE, TRUE, TRUE, FALSE, NULL),
--specials
('Portobello Mushrooms', 76.00, NULL,
 'Fresh mushrooms stuffed with a blend of 4 cheeses, crispy coating. Served with creamy sweet potato mash, soy sauce.',
 9, FALSE, TRUE, TRUE, TRUE, 70.00),

('Chestnut Sweet Potato Gnocchi', 72.00, NULL,
 'Gnocchi in cream sauce with mushrooms, parmesan cheese and roasted chestnuts.',
 9, FALSE, TRUE, TRUE, FALSE, NULL),

('Calzone', 69.00, NULL,
 'Italian baked pastry filled with cream cheese, forest mushrooms, onion, spinach, mozzarella and cheese.',
 9, FALSE, TRUE, TRUE, TRUE, 65.00),

('Artichoke Ravioli', 69.00, NULL,
 'Italian pasta filled with artichokes and cheeses, served in buttery sauce with cherry tomatoes, Kalamata olives, red onion, basil.',
 9, FALSE, TRUE, TRUE, FALSE, NULL),

('Mushroom Risotto', 74.00, NULL,
 'Winter rice dish with forest mushrooms in butter, parmesan, fresh parsley and touches of truffle oil.',
 9, FALSE, TRUE, TRUE, TRUE, 69.00),

('Beetroot Gnocchi', 72.00, NULL,
 'Sautéed sweet potato gnocchi in garlic butter, served in local beetroot sauce with Italian feta cheese.',
 9, FALSE, TRUE, TRUE, FALSE, NULL),

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
 3, FALSE, FALSE, TRUE, FALSE, NULL),
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
 ('Fettuccine Rosa', 68.00, NULL,
 'Tomato cream sauce with basil leaves and parmesan cheese.',
 6, FALSE, TRUE, TRUE, TRUE, 64.00),

('Ballerina Tomato & Olives', 62.00, NULL,
 'Whole wheat pasta in ripe tomato sauce, basil, garlic and Kalamata olives.',
 6, TRUE, TRUE, TRUE, FALSE, NULL),

('Tamara Ravioli', 76.00, NULL,
 'Goat cheese ravioli with green onion, in a creamy parmesan sauce with lemon.',
 6, FALSE, TRUE, TRUE, TRUE, 72.00),


-- Desserts
('Lemon pistachio bar', 53.00, NULL,
 'Crunchy pistachio base, lemon cream, pistachio topping and Chantilly.',
 11, FALSE, TRUE, TRUE, FALSE, NULL),
('New York cheesecake', 53.00, NULL,
 'Homemade cheesecake with vanilla cream.',
 11, FALSE, TRUE, TRUE, FALSE, NULL),
 ('Upside-down Apple Pie', 53.00, NULL,
 'Baked apple slices on a crispy pastry base, drizzled with salted caramel sauce.',
 11, FALSE, TRUE, TRUE, FALSE, NULL),

('French Tiramisu', 53.00, NULL,
 'Layers of espresso-soaked biscuits, mascarpone cream, coffee, decorated with cocoa.',
 11, FALSE, TRUE, TRUE, FALSE, NULL),


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
 8, TRUE, TRUE, TRUE, FALSE, NULL),
 ('Health Salad', 66.00, NULL,
 'Bulgur, black lentils, green mix, roasted sweet potato cubes, red onion, cashews, low-fat Bulgarian cheese cubes.',
 8, TRUE, TRUE, TRUE, TRUE, 62.00),

('Tamara Salad', 78.00, NULL,
 'Colorful lettuce mix, cherry tomatoes, roasted peppers, red onion, Kalamata olives, carrot, fried goat cheese.',
 8, FALSE, TRUE, TRUE, FALSE, NULL),

('Toast Salad', 74.00, NULL,
 'Toasted cubes sautéed in garlic butter, filled with mozzarella and pesto, on a bed of lettuce leaves with aioli dressing.',
 8, FALSE, TRUE, TRUE, TRUE, 70.00);



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
-- Specials
UPDATE dishes SET image_url='/images/dishes/portobello_mushrooms.jpg' WHERE name='Portobello Mushrooms';
UPDATE dishes SET image_url='/images/dishes/chestnut_sweet_potato_gnocchi.jpg' WHERE name='Chestnut Sweet Potato Gnocchi';
UPDATE dishes SET image_url='/images/dishes/calzone.jpg' WHERE name='Calzone';
UPDATE dishes SET image_url='/images/dishes/artichoke_ravioli.jpg' WHERE name='Artichoke Ravioli';
UPDATE dishes SET image_url='/images/dishes/mushroom_risotto.jpg' WHERE name='Mushroom Risotto';
UPDATE dishes SET image_url='/images/dishes/beetroot_gnocchi.jpg' WHERE name='Beetroot Gnocchi';

-- Pastas
UPDATE dishes SET image_url='/images/dishes/fettuccine_rosa.jpg' WHERE name='Fettuccine Rosa';
UPDATE dishes SET image_url='/images/dishes/ballerina_tomato_olives.jpg' WHERE name='Ballerina Tomato & Olives';
UPDATE dishes SET image_url='/images/dishes/tamara_ravioli.jpg' WHERE name='Tamara Ravioli';

-- Salads
UPDATE dishes SET image_url='/images/dishes/health_salad.jpg' WHERE name='Health Salad';
UPDATE dishes SET image_url='/images/dishes/tamara_salad.jpg' WHERE name='Tamara Salad';
UPDATE dishes SET image_url='/images/dishes/toast_salad.jpg' WHERE name='Toast Salad';

-- Desserts
UPDATE dishes SET image_url='/images/dishes/upside_down_apple_pie.jpg' WHERE name='Upside-down Apple Pie';
UPDATE dishes SET image_url='/images/dishes/french_tiramisu.jpg' WHERE name='French Tiramisu';
