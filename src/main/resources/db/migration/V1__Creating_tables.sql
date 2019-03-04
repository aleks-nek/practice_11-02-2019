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

CREATE TABLE country (
  id serial PRIMARY KEY,
  name varchar(50)
);

INSERT INTO country (name) VALUES ('Azərbaycan');
INSERT INTO country (name) VALUES ('Eesti');
INSERT INTO country (name) VALUES ('Latvijā');
INSERT INTO country (name) VALUES ('Lietuva');
INSERT INTO country (name) VALUES ('Polska');
INSERT INTO country (name) VALUES ('Suomi');
INSERT INTO country (name) VALUES ('Türkiye');
INSERT INTO country (name) VALUES ('Ўзбекистон');
INSERT INTO country (name) VALUES ('Беларусь');
INSERT INTO country (name) VALUES ('Другая');
INSERT INTO country (name) VALUES ('Кыргызстан');
INSERT INTO country (name) VALUES ('Россия');
INSERT INTO country (name) VALUES ('Україна');
INSERT INTO country (name) VALUES ('Қазақстан');
INSERT INTO country (name) VALUES ('Հայաստան');
INSERT INTO country (name) VALUES ('საქართველო');

CREATE TABLE employee_role (
  id serial PRIMARY KEY,
  name VARCHAR(50)
);

INSERT INTO employee_role (name) VALUES ('ROLE_OWNER');

CREATE TABLE company (
  id serial PRIMARY KEY,
  name VARCHAR(50),
  country_id INTEGER NOT NULL REFERENCES country(id),
  city VARCHAR(50)
);

CREATE TABLE employee (
  id serial PRIMARY KEY,
  employee_role_id INTEGER NOT NULL REFERENCES employee_role(id),
  account_id INTEGER NOT NULL UNIQUE REFERENCES account(id),
  company_id INTEGER NOT NULL REFERENCES company(id)
);