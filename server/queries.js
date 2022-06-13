// const pool = require("/pool.js")

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'amandawright',
  host: 'localhost',
  database: 'dragon',
  password: '',
  port: 5432,
})

const getProducts = (req, res) => {
  pool.query(`SELECT json_agg(row_to_json(products))
  FROM (
    SELECT id, "name", slogan, "description", category, CAST(default_price AS text)
    from products LIMIT 5
  ) products;`, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.data)
  })
}

module.exports = {
  getProducts
}