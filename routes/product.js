var express = require('express');
var router = express.Router();

const productApi = require('../api/product');
const commentApi = require('../api/comment');
const passport = require('../passport/local-auth');

router.get('/:id', async(req, res, next) => {
  const productId = req.params.id;

  const product = await productApi.getProduct( productId );
  const commentsList = await commentApi.getCommentsByProduct( productId );

  const randomProducts = await productApi.getRandomProducts();
  const fee = feeCalculator( product.price );
  console.log( product.price );
  console.log( fee );

  // console.log( commentsList );

  res.render('pages/product', { 
    title: product.name,
    relacionados: randomProducts,
    commentsList,
    productId: productId,
    fee: fee,
    product
  });

});

router.post('/:id', passport.isAuthenticated ,async( req, res, next ) => {
  const comment = req.body.content;
  const userId = req.user.dataValues.id
  const productId = req.params.id;
  console.log( `El numero que quier ver ${productId}` );
  // console.log( comment );
  // const fecha = new Date;
  // console.log( `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDay()}` );
  const newComment = await commentApi.addComment( productId, userId, comment );
  // console.log( newComment );

  res.redirect('back');
})

// Calculadora de cuotas
const feeCalculator = ( price ) => {
  return fee = {
    fee6: (price / 6).toFixed(2),
    fee3: (price / 3).toFixed(2),
    fee12: (price / 12).toFixed(2)
  };
}

module.exports = router;