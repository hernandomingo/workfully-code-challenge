CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    balance float NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    accountId INTEGER NOT NULL,
    transactionType varchar NOT NULL,
    amount float NOT NULL,
    date DATE NOT NULL

);

INSERT INTO accounts (id, balance) VALUES 
(1, 100), 
(2, 1000), 
(3, 500);