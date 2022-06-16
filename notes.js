--gets all the products info (right now just the first 5 rows for testing that it works without waiting forever)
SELECT json_agg(row_to_json(products))
FROM (
  SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
  from products LIMIT 5
) products;


model.products.getPage = function(page, count) {
const sql = `
SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
        FROM products
        ORDER BY id
        LIMIT (count) / ($1)
        OFFSET page*count / ($1 * $2)
       )products"`
    return db.query(sql, [page, count])
}
-- SELECT * FROM carts;
-- SELECT json_agg(row_to_json(products))
-- FROM (
--   SELECT id, "name", slogan, "description", category, (CAST( default_price AS text))
--   from products
-- ) products;

-- SELECT row_to_json("products") FROM "products"; --get each row as its own object still need
--to make default price a string

-- SELECT json_agg(row_to_json(products))
-- FROM (
--   SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
--   from products LIMIT 5
-- ) products;

--limit based on count (default 5) starting at page (default 1)

CREATE OR REPLACE FUNCTION page(
    Page INTEGER = 1,
    PageSize INTEGER = 5
)
RETURNS SETOF public.products AS $$
BEGIN
  RETURN QUERY
    SELECT *
    FROM public.products
    ORDER BY product_id
    LIMIT (PageSize)
    OFFSET page*PageSize;
  RETURN;
END;$$
  LANGUAGE plpgsql;

  CREATE OR REPLACE FUNCTION _page(
    Page INTEGER = 1,
    PageSize INTEGER = 5
)
RETURNS SETOF public.products AS $$
BEGIN
  RETURN QUERY
    SELECT json_agg(row_to_json(products))
    FROM (
        SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
        FROM products
        ORDER BY id
        LIMIT (PageSize)
        OFFSET page*PageSize
       )products;
  RETURN;

END;$$
  LANGUAGE plpgsql;

SELECT _page(2, 6);

model.products.getPage = function(page, count) {
  const sql = `
  SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
          FROM products
          ORDER BY id
          LIMIT (count) / ($1)
          OFFSET page*count / ($1 * $2)
         )products"`
  return db.query(sql, [page, count])
}

