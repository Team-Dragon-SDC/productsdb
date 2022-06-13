-- SELECT * FROM carts;
-- SELECT json_agg(row_to_json(products))
-- FROM (
--   SELECT id, "name", slogan, "description", category, (CAST( default_price AS text))
--   from products
-- ) products;

-- SELECT row_to_json("products") FROM "products"; --get each row as its own object still need
--to make default price a string

SELECT json_agg(row_to_json(products))
FROM (
  SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
  from products LIMIT 5
) products;