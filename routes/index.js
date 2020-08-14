var express = require('express');
var router = express.Router();

const productApi = require('../api/product');

router.get('/', async(req, res, next) => {
  const discountProducts = await productApi.getDiscountProducts();
  const featuredProducts = await productApi.getFeaturedProducts();
  const recommendedproducts = await productApi.getRecommendedProducts();

  console.log( res );

  res.render('pages/index', { 
    title: 'Luna Golf Store',
    home: true,
    discountProducts,
    featuredProducts,
    recommendedproducts
  });
});

module.exports = router;
