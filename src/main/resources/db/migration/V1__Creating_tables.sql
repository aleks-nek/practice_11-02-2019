CREATE TABLE profile (
  id  serial PRIMARY KEY,
  email VARCHAR (254) UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

CREATE TABLE role_dictionary (
  id serial PRIMARY KEY ,
  name VARCHAR(50)
);

INSERT INTO role_dictionary (name) VALUES ('ROLE_ADMIN');
INSERT INTO role_dictionary (name) VALUES ('ROLE_USER');

CREATE TABLE account (
  id serial PRIMARY KEY,
  login VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR(150) NOT NULL,
  profile_id INTEGER NOT NULL UNIQUE  REFERENCES profile(id),
  role_id INTEGER NOT NULL REFERENCES role_dictionary(id)
);