var express = require('express');
var router = express.Router();

const productApi = require('../api/product');

router.get('/', async(req, res, next) => {
  const query = req.query.q;
  const productList = await productApi.searchProduct( query );

  res.render('pages/search', { 
      title: 'Busqueda',
      productos: productList,
      valor:  req.query.q
    });
});

module.exports = router;