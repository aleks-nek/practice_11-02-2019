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
  company_id INTEGER NOT NULL REFERENCES company(id)
);


CREATE TABLE account (
   id serial PRIMARY KEY,
   login VARCHAR (50) UNIQUE NOT NULL,
   password VARCHAR(150) NOT NULL,
   employee_id INTEGER NOT NULL UNIQUE REFERENCES employee(id),
   profile_id INTEGER NOT NULL UNIQUE  REFERENCES profile(id),
   role_id INTEGER NOT NULL REFERENCES role_dictionary(id)
);

-- Клиент компании
CREATE TABLE client (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  company_id INTEGER NOT NULL REFERENCES company(id),
  email VARCHAR(254),
  address VARCHAR(255),
  comment VARCHAR(255),
  is_conflicted BOOLEAN DEFAULT FALSE
);

-- Тип заказа
CREATE TABLE order_type (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO order_type (name) VALUES ('Paid');
INSERT INTO order_type (name) VALUES ('Warranty');

-- Тип девайса
CREATE TABLE device_type (
  id serial PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO device_type (name) VALUES ('Laptop');
INSERT INTO device_type (name) VALUES ('Smartphone');

-- Заказ
CREATE TABLE orders (
  id serial PRIMARY KEY,
  imei VARCHAR(50),
  brand VARCHAR(50),
  model VARCHAR(50),
  equipment VARCHAR(255),
  appearance VARCHAR(255),
  password VARCHAR(255),
  defect VARCHAR(255),
  receiver_notes VARCHAR(255),
  estimated_price INTEGER,
  quickly BOOLEAN DEFAULT FALSE,
  order_type_id INTEGER NOT NULL REFERENCES order_type(id),
  client_id INTEGER NOT NULL REFERENCES client(id),
  device_type_id INTEGER NOT NULL REFERENCES device_type(id),
  manager_id INTEGER REFERENCES employee(id),
  executor_id INTEGER REFERENCES employee(id)
);