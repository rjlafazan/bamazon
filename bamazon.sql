DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;
USE bamazonDB;
CREATE TABLE products
(
    item_id INT(100)
    AUTO_INCREMENT NOT NULL,
  product_name VARCHAR
    (100) NOT NULL,
  department_name VARCHAR
    (100) NOT NULL,
  price DECIMAL
    (10,2) INT NOT NULL,
  stock_quantity INT
    (100) NOT NOT NULL,
  PRIMARY KEY
    (item_id)
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("T-shirt", "Clothing", 20, 25);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Cat Picture - limited edition", "Art", 1000, 4);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Cat Picture - standard", "Art", 15, 98);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Dog Playtime", "Service", 25, 3);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Good Cheese", "Food", 99, 30);
    SELECT *
    FROM products;