const Queries = require('../models/Queries.js');

const getProducts = (req, res) => {
  Queries.getPage()
    .then((data) => res.json(data))
    .catch((err) => console.log('error', err));
}

module.exports = {getProducts};