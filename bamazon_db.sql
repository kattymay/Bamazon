DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10, 2),
stock_quantity INTEGER(10),
PRIMARY KEY (item_id)
);


SELECT * FROM products;
USE bamazon_db;


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("rake", "gardening", 10.29, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("watering can", "gardening", 7.59, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("pack blackberry seeds", "gardening", 3.11, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("pack blueberry seeds", "gardening", 3.11, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("pack strawberry seeds", "gardening", 3.11, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("planter's box", "gardening", 12.29, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("potting mix", "gardening", 22.29, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("fertilizer", "gardening", 15.59, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("bird bath", "gardening", 24.29, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUE ("shovel", "gardening", 12.29, 50);