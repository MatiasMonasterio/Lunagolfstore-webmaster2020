var express = require('express');
var router = express.Router();

const passport = require('../passport/local-auth');

const addressApi = require('../api/address');
const favoriteApi = require('../api/favorite');
const cartApi = require('../api/cart');
const userApi = require('../api/user');
const user = require('../api/user');

router.get('/', passport.isAuthenticated, ( req, res ) => {
  res.redirect('/user/profile');
});

router.get('/cart', passport.isAuthenticated, async( req, res ) => {
  const userId = req.user.dataValues.id;
  const cartList = await cartApi.getCartByUser( userId );

  res.render('pages/user', { 
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Carrito',
    path: 'user-card',
    carrito: true,
    cartList: cartList
  });
});

router.get('/purchases', passport.isAuthenticated, ( req, res ) => {
  res.render('pages/user', {
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Compras',
    compras: true 
  });
});

router.get('/favorite', passport.isAuthenticated, async( req, res ) => {
  const userId = req.user.dataValues.id;
  const favoriteList = await favoriteApi.getFavoriteListByUser( userId );

  console.log( favoriteList );

  res.render('pages/user', { 
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Favoritos',
    favoritos: true,
    favoriteList: favoriteList
  });
});

router.get('/history-search', passport.isAuthenticated, async(req, res) => {
  res.render('pages/user', { 
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Historial',
    historial: true
   });
});

router.get('/profile', passport.isAuthenticated, async( req, res, next ) => {
  const userId = req.user.dataValues.id;
  const billingAddress = await addressApi.getBillingAddressByUser( userId );
  const shippingAddress = await addressApi.getShippingAddressByUser( userId );

  console.log( billingAddress );

  res.render('pages/user', { 
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Mis datos',
    profile: true,
    userData: req.user.dataValues,
    billingAddress: billingAddress,
    shippingAddress: shippingAddress
   });
});

router.get('/profile-edit', passport.isAuthenticated, async( req, res, next ) => {
  const userId = req.user.dataValues.id;
  const billingAddress = await addressApi.getBillingAddressByUser( userId );
  const shippingAddress = await addressApi.getShippingAddressByUser( userId );

  res.render('pages/user', {
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Cambiar datos',
    profileEdit: true,
    userData: req.user.dataValues,
    billingAddress: billingAddress,
    shippingAddress: shippingAddress
  });
});

router.post('/profile-edit', passport.isAuthenticated, async(req, res, next) => {
  const userId = req.user.dataValues.id;

  const userData = {
    name: req.body.name,
    lastname: req.body.lastname,
    gender: req.body.gender,
    date: req.body.date
  }

  const billingAddressData = {
    street: req.body.addressFac[0],
    number: req.body.numberFac[0],
    city: req.body.cityFac[0],
    location: req.body.locationFac[0],
    postal_code: req.body.postalFac[0],
  }

  const shippingAddressData = {
    street: req.body.addressFac[1],
    number: req.body.numberFac[1],
    city: req.body.cityFac[1],
    location: req.body.locationFac[1],
    postal_code: req.body.postalFac[1],
  }
  
  await userApi.updateUserById( userId, userData );
  await addressApi.updateBillingAddress( userId, billingAddressData );
  await addressApi.updateShippingAddress( userId, shippingAddressData );

  res.redirect('/user/profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;