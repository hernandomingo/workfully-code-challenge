CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    balance float NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO accounts (id, balance, createdAt, updatedAt) VALUES 
(1, 100, NOW(), NOW()), 
(2, 1000, NOW(), NOW()), 
(3, 500, NOW(), NOW());