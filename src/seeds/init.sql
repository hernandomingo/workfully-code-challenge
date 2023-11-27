CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    balance float NOT NULL
);

INSERT INTO accounts (id, balance, dailyDeposits) VALUES 
(1, 100), 
(2, 1000), 
(3, 500);