-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS plants;

CREATE TABLE plants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    scientific_name VARCHAR
);




INSERT INTO plants (name, scientific_name) 

VALUES 
('Cactus', 'Cactaceae'),
('Swiss Cheese Plant', 'Monstera deliciosa'),
('Rubber Plant', 'Ficus elastica')
