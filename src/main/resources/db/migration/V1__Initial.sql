CREATE TABLE account (
  id serial PRIMARY KEY,
  login VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL
);
-- INSERT INTO account VALUES (1, 'admin', 'admin');