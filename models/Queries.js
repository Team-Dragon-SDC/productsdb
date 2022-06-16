const pool = require('../db.js');

// const currentPage = somethiSelng;
const getPage = function(page=1, count=5) {
  if (page === 1) {
    const currentPage = page
  } else {
    const currentPage = page * count;
  }
  const sql = `
    SELECT json_agg(row_to_json(products))
        FROM (
          SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
          FROM products
          WHERE ${currentPage}
          ORDER BY id
          LIMIT ${count}
        )products`
  return pool.query(sql)
}
module.exports = {getPage};

//save the previous page and limit. check if the current one is bigger or smaller than the previous
//if its larger then use that variable plus the limit to get to the next page
//if its less then use that variable minus the limit to get to the previous page