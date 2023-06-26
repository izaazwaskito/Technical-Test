CREATE DATABASE ecommerce_psql

CREATE TABLE category(id_category SERIAL PRIMARY KEY, name_category VARCHAR NOT NULL);

CREATE TABLE product(id_product SERIAL PRIMARY KEY, id_category INT NOT NULL, name_product VARCHAR NOT NULL, price_product INT NOT NULL, description_product VARCHAR NOT NULL, stock_product INT NOT NULL);

CREATE TABLE transaction(id_order SERIAL PRIMARY KEY, id_product INT NOT NULL, quantity_order INT NOT NULL, date_order DATE);