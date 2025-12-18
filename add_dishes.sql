-- INSERT INTO categories (name) VALUES
-- ('Starters'),
-- ('Breakfast'),
-- ('Toasts'),
-- ('Focaccias'),
-- ('Sandwiches'),
-- ('Pastas'),
-- ('Pizzas'),
-- ('Salads'),
-- ('Specials'),
-- ('Fish'),
-- ('Desserts');

INSERT INTO dishes (
    name, price, image_url, ingredients, category_id,
    is_vegan, is_vegetarian, in_stock, on_sale, sale_price
) VALUES
--focaccias
('Coal focaccia', 64.00, '/images/dishes/coal_focaccia.png',
 'Grilled eggplant, placed on crispy focaccia with a drizzle of millstone-ground tahini, date syrup, feta cheese shavings, and basil.', 
 4, FALSE, TRUE, TRUE, TRUE, 58.00),
 --Sandwiches
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
 --Fish
 ('Sea morals', 134.00, '/images/dishes/sea_morals.png',
 'Served with green mashed potatoes, green beans, broccoli florets and red wine sauce.',
 10, FALSE, FALSE, TRUE, FALSE, NULL),
  ('FISH & CHIPS', 89.00, '/images/dishes/fish_and_chips.png',
 'Cod fish pieces coated in panko crumbs, on a bed of crispy steak fries, served with amba aioli.',
 10, FALSE, FALSE, TRUE, TRUE, 79.00),
  ('Japanese sea bass', 49.00, '/images/dishes/japanese_sea_bass.png',
 'A meaty whole fish, grilled, with the aroma of garlic and olive oil, accompanied by oven-roasted root vegetables and sauce...',
 10, FALSE, FALSE, TRUE, FALSE, NULL);

