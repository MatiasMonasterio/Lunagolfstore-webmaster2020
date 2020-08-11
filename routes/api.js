var express = require('express');
var router = express.Router();
const favoriteApi = require('../api/favorite');
const { isAuthenticated } = require('../passport/local-auth');

const productApi = require('../api/product');

router.post('/product', async(req, res, next) => {
    const productId = req.body.productId;
    const product = await productApi.getProduct( productId )

    res.json( product );
});

router.post('/add_favorite', isAuthenticated, async(req, res, next) => {
    const productId = req.body.productId;
    const userId = req.user.dataValues.id;
    console.log('entro');

    const newFavorite = favoriteApi.addFavorite( productId, userId);
    res.send( newFavorite );
});

router.post('/check-fav', isAuthenticated, async(req, res, next) => {
    const productId = req.body.productId;
    const userId = req.user.dataValues.id;

    const favoriteExist = await favoriteApi.getOneFavorite( productId, userId );
    res.json( favoriteExist );
});

router.post('/delete-fav', isAuthenticated, async(req, res, next) => {
    const favoriteId = req.body.favoriteId;

    const favorite = await favoriteApi.deleteFavoriteById( favoriteId );
    console.log( favorite );
    res.json( favorite );
});

module.exports = router;