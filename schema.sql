DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;
DROP TABLE IF EXISTS carts;

CREATE TABLE products(
  id integer PRIMARY KEY,
  "name" text,
  slogan text,
  "description" text,
  category text,
  default_price numeric
);

CREATE TABLE features(
  id integer PRIMARY KEY,
  product_id integer REFERENCES products(id),
  feature text,
  "value" text
);

CREATE TABLE styles(
  id integer PRIMARY KEY,
  product_id integer REFERENCES products (id),
  "name" text,
  sale_price numeric,
  original_price numeric,
  default_style integer
);

CREATE TABLE photos(
  id integer PRIMARY KEY,
  style_id integer REFERENCES styles (id),
  "url" text,
  thumbnail_url text
);

CREATE TABLE skus(
  id integer PRIMARY KEY,
  style_id integer REFERENCES styles (id),
  size integer,
  quantity integer
);

CREATE TABLE related(
  id integer PRIMARY KEY,
  current_product_id integer REFERENCES products (id),
  related_product_id integer REFERENCES products (id)
);

CREATE TABLE carts(
  id integer PRIMARY KEY,
  user_session integer,
  product_id integer REFERENCES products (id),
  active integer
);

