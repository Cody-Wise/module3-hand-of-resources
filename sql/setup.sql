-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS plants;

DROP TABLE IF EXISTS fishing_gear;

DROP TABLE IF EXISTS star_trek;

DROP TABLE IF EXISTS beauty_supplies;

DROP TABLE IF EXISTS nintendo_games;

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

CREATE TABLE star_trek (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    series VARCHAR
);

    CREATE TABLE beauty_supplies (
        id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        item_name VARCHAR,
        price INT
    );

    CREATE TABLE nintendo_games (
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

INSERT INTO star_trek (first_name, last_name, series)

VALUES
('James', 'Tiberius', 'The Next Generation'),
('Jean-Luc', 'Picard', 'The Next Generation'),
('Miles', 'O''brien', 'Deep Space Nine');

INSERT INTO beauty_supplies (item_name, price)

VALUES
('Lipstick', 10),
('Lip Gloss', 5),
('Lip Balm', 5);

INSERT INTO nintendo_games (item_name, price)

 VALUES
('Super Mario Bros', 56),
('Super Mario Bros 3', 54),
('Metroid', 49);