require('dotenv').config();
const express = require('express'); //install express to webpack
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const app = express();
const queries = require('../controllers/queries');

app.use(express.json());
//configuration object instance: root to api
const api = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc',
  headers: {
    'Authorization': process.env.API_TOKEN
  }
});

app.get('/products', queries.getProducts)

app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});

//add routes here to the api then change front end to route here

