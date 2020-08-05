var express = require('express');
var router = express.Router();

// const productos = require('../public/javascripts/productos-para-todos-los-plato.json');
// const prueba = require('../api/user');
const productApi = require('../api/product');

router.get('/', async(req, res, next) => {

  // const llamada = await prueba.getUserByName('matias');
  // console.log( llamada );

  const productsRandom = await productApi.getRandomProducts();

  console.log( res );

  res.render('pages/index', { 
    title: 'Luna Golf Store',
    home: true,
    productos: productsRandom
  });
});

module.exports = router;
