var express = require('express');
var router = express.Router();

const productosPrueba = require('../public/javascripts/productos-para-todos-los-plato.json');
const filtrosPalos = require('../public/assets/filtros-palos.json');
const filtrosPelotas = require('../public/assets/filtros-pelotas.json');
const filtrosBolsos = require('../public/assets/filtros-bolsos.json');
const filtrosCarros = require('../public/assets/filtros-carros.json');
const filtrosRopa = require('../public/assets/filtros-ropa/accesorios.json');


// const categoryApi = require('../api/category');
const productApi = require('../api/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/products/palos-sets');
  // res.render('pages/products', { 
  //   title: 'Productos',
  //   products: true
  // });
});

router.get('/palos-sets', async(req, res, next) => {

  const categoryId = 1;
  const order = req.query.order;
  const productList = await productApi.getProductsByCategory( categoryId, order );

  res.render('pages/products', {
    title: 'Palos y sets',
    path: '/palos-sets',
    producs: productList,
    filtro: filtrosPalos,
    palos: true
  });
});
router.get('/pelotas', async(req, res, next) => {
  const productList = await productApi.getProductsByCategory( 2 );

  res.render('pages/products', {
    title: 'Pelotas',
    path: '/pelotas',
    producs: productosPrueba,
    filtro: filtrosPelotas,
    pelotas: true,
    productList
  });
});
router.get('/bolsos', function(req, res, next) {
  res.render('pages/products', {
    title: 'Bolsos',
    path: '/bolsos',
    producs: productosPrueba,
    filtro: filtrosBolsos,
    bolsos: true
  });
});
router.get('/carros', function(req, res, next) {
  res.render('pages/products', {
    title: 'Carros',
    path: '/carros',
    producs: productosPrueba,
    filtro: filtrosCarros,
    carros: true
  });
});
router.get('/ropa-accesorios', function(req, res, next) {
  res.render('pages/products', {
    title: 'Indumentaria',
    path: '/ropa-accesorios',
    producs: productosPrueba,
    filtro: filtrosRopa,
    indumentaria: true
  });
});


router.post('/get-data-by-category', async(req, res, next) => {
  const { categoryId, filter, from } = req.body;

  const productList = await productApi.getProductsByCategory( categoryId, filter, from );
  res.json( productList );
})

module.exports = router;