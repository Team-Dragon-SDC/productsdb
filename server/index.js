require('dotenv').config();
const express = require('express'); //install express to webpack
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const app = express();
const db = require('./queries')

app.use(express.json());
//configuration object instance: root to api
const api = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfc/',
  headers: {
    'Authorization': process.env.API_TOKEN
  }
});

// app.get('/products', (req, res) => {
//   api.get('/products') //this is it because create adds the other info
//     .then(response => res.send(response.data))
//     .catch(err => {
//       console.log(err);
//       res.send(500);
//     });

// });
app.get('/products', db.getProducts)
//req.params and req.query for params
app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});

//add routes here to the api then change front end to route here