--gets all the products info (right now just the first 5 rows for testing that it works without waiting forever)
SELECT json_agg(row_to_json(products))
FROM (
  SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
  from products LIMIT 5
) products;