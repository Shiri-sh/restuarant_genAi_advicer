

USE TamaraResDB;

-- -----------------------------------------------------
-- Categories Table
-- -----------------------------------------------------
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
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

    /*spicy_level ENUM('none','mild','medium','spicy','very spicy') DEFAULT 'none',*/

    is_vegan BOOLEAN DEFAULT FALSE,
    is_vegetarian BOOLEAN DEFAULT FALSE,

    /*weight_level ENUM('light','medium','heavy') DEFAULT 'medium',*/

    in_stock BOOLEAN DEFAULT TRUE,
    on_sale BOOLEAN DEFAULT FALSE,
    sale_price DECIMAL(10,2) NULL,

    /*people_served INT DEFAULT 1,*/

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id)
);
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
INSERT INTO dishes (
    name,price, image_url, ingredients_list,category_id, /*spicy_level*/,is_vegan, is_vegetarian, /*weight_level*/, in_stock, on_sale, sale_price, /*people_served*/
) 
VALUES 
('Chips',32.00,NULL,
'Crispy potato sticks', 1, 
/*'none'*/,FALSE,TRUE,/*'medium'*/,TRUE,FALSE,NULL,/*1*/);

('Soup of the day',39.00,NULL,
'With a warm bun and butter.',
 1, /*'none'*/,FALSE,TRUE,/*'medium'*/,TRUE,FALSE,NULL,/*1*/);

('Dreamy skewers',52.00,NULL,
'Crispy fingers of halloumi cheese, drizzled with teriyaki sauce.',
 1, /*'none'*/,FALSE,TRUE,/*'medium'*/,TRUE,FALSE,NULL,/*1*/);

/*breakfast*/
(/*name*/'Tamara Double Morning',/*price*/152.00,/*photo*/NULL,
/*ingredients*/'Omelette of choice: Spanish omelette - garlic, tomatoes and a little spicy / Forest omelette - wild mushrooms and green onions /...',
/*category_id*/ 2,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/TRUE,/*sale_price*/150.00,);
(/*name*/'Spicy tomato shakshuka',/*price*/69.00,/*photo*/NULL,
/*ingredients*/'Served with Moroccan farina, house dips and coffee or natural juice. Optional toppings: grated feta cheese,...',
/*category_id*/ 2,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);

/*toats*/
(/*name*/'Smoked salmon toast',/*price*/62.00,/*photo*/NULL,
/*ingredients*/'Crispy bagel, spread with smooth cream cheese, mozzarella cheese, red onion and pieces of smoked salmon.',
/*category_id*/ 3,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);
(/*name*/'Tamara Toast',/*price*/59.00,/*photo*/NULL,
/*ingredients*/'Crispy bagel spread with cream cheese, tomato basil sauce, black Kalamata olives and mozzarella cheese.',
/*category_id*/ 3,/*spicy_level*/ 'none',/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*weight_level*/'medium',/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);
(/*name*/'Cheesy toast',/*price*/62.00,/*photo*/NULL,
/*ingredients*/'Crispy bagel with sesame seeds filled with cream cheese, pesto, red onion, hard-boiled egg, Kalamata olives and...',
/*category_id*/ 3,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);

/*pastas*/
(/*name*/'Creamy salmon fettuccine',/*price*/82.00,/*photo*/NULL,
/*ingredients*/'Salmon cubes, sautéed mushrooms in a cream sauce and Parmesan.',
/*category_id*/ 6,/*is_vegan*/FALSE,/*is_vegetarian*/FALSE,/*in_stock*/TRUE,/*on_sale*/TRUE,/*sale_price*/80.00);
(/*name*/'Penna Wild Mushroom Cream',/*price*/66.00,/*photo*/NULL,
/*ingredients*/'Sautéed mushrooms, garlic, chard, Parmesan cream and a touch of wine.',
/*category_id*/ 6,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);

/*desserts*/
(/*name*/'Lemon pistachio bar',/*price*/53.00,/*photo*/NULL,
/*ingredients*/'Crunchy pistachio base, lemon cream, pistachio topping and Chantilly cream drizzle. Served with pistachio crumbs.',
/*category_id*/ 10,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);
(/*name*/'New York cheesecake',/*price*/53.00,/*photo*/NULL,
/*ingredients*/'Homemade cheesecake baked on a bed of butter cookies topped with vanilla cream.',
/*category_id*/ 10,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);

/*pizza*/
(/*name*/'Pizza Emilia',/*price*/59.00,/*photo*/NULL,
/*ingredients*/'Tomato and basil sauce, mozzarella and yellow cheese shreds, hard-boiled egg, fresh rocket leaves, drizzled with...',
/*category_id*/ 7,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);
(/*name*/'Goat pizza',/*price*/59.00,/*photo*/NULL,
/*ingredients*/'Fresh tomato sauce, mozzarella cheese, basil pesto and goat cheese rings.',
/*category_id*/ 7,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/FALSE,/*on_sale*/FALSE,/*sale_price*/NULL);

/*salads*/
(/*name*/'Sweet potato and walnut salad',/*price*/67.00,/*photo*/NULL,
/*ingredients*/'A selection of lettuce in balsamic vinaigrette sauce, tomatoes, green cucumber, walnuts, grated feta cheese and sweet potato fries...',
/*category_id*/ 8,/*is_vegan*/FALSE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/TRUE,/*sale_price*/60.00);
(/*name*/'Greek Piraeus Salad',/*price*/59.00,/*photo*/NULL,
/*ingredients*/'Fresh lettuce mixture dipped in zaatar and olive oil, cherry tomatoes, green cucumber, Kalamata olives, red onion...',
/*category_id*/ 8,/*is_vegan*/TRUE,/*is_vegetarian*/TRUE,/*in_stock*/TRUE,/*on_sale*/FALSE,/*sale_price*/NULL);
