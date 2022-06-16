-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS plants;

DROP TABLE IF EXISTS fishing_gear;

CREATE TABLE plants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    scientific_name VARCHAR
);

CREATE TABLE fishing_gear (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_name VARCHAR,
    price INT
);

INSERT INTO plants (name, scientific_name) 

VALUES 
('Cactus', 'Cactaceae'),
('Swiss Cheese Plant', 'Monstera deliciosa'),
('Rubber Plant', 'Ficus elastica');

INSERT INTO fishing_gear (item_name, price)

VALUES
('Fishing Rod', 10),
('Fishing Line', 5),
('Fishing Hooks', 5);
