var express = require('express');
var router = express.Router();

const passport = require('../passport/local-auth');

const addressApi = require('../api/address');
const favoriteApi = require('../api/favorite');
const cartApi = require('../api/cart');
const userApi = require('../api/user');
const mailchimpApi = require('../mailchimp/api');

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
  const userEmail = req.user.dataValues.email;
  const billingAddress = await addressApi.getBillingAddressByUser( userId );
  const shippingAddress = await addressApi.getShippingAddressByUser( userId );

  // Verificar si el usuario esta subscripto o no a mailchimp
  const subscribed = await mailchimpApi.chechSubscription( userEmail );

  res.render('pages/user', { 
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Mis datos',
    profile: true,
    subscribed,
    userData: req.user.dataValues,
    billingAddress: billingAddress,
    shippingAddress: shippingAddress
   });
});


router.get('/profile-edit', passport.isAuthenticated, async( req, res, next ) => {
  const userData = req.user.dataValues;
  const userId = userData.id;
  let genderUser;
  let noDataGender;

  const billingAddress = await addressApi.getBillingAddressByUser( userId );
  const shippingAddress = await addressApi.getShippingAddressByUser( userId );

  if( userData.gender === 'Masculino' ) genderUser = true;
  if( userData.gender === 'Femenino' ) genderUser = false;
  if( !userData.gender ) noDataGender = true;

  res.render('pages/user', {
    user: {
      name: req.user.dataValues.name,
      lastname: req.user.dataValues.lastname
    },  
    title: 'Cambiar datos',
    profileEdit: true,
    genderUser,
    noDataGender,
    userData: userData,
    billingAddress: billingAddress,
    shippingAddress: shippingAddress
  });
});

// POST para cambiar datos del usuario
router.post('/profile-edit', passport.isAuthenticated, validateParams, async(req, res, next) => {
  const userId = req.user.dataValues.id;
  const formData = req.body;

  const userData = {
    name: formData.name,
    lastname: formData.lastname,
    gender: formData.gender,
    date: formData.date,
  }

  const billingAddressData = {
    street: formData.addressFac[0],
    number: formData.numberFac[0],
    city: formData.cityFac[0],
    location: formData.locationFac[0],
    postal_code: formData.postalFac[0],
  }

  const shippingAddressData = {
    street: formData.addressFac[1],
    number: formData.numberFac[1],
    city: formData.cityFac[1],
    location: formData.locationFac[1],
    postal_code: formData.postalFac[1],
  }
  
  await userApi.updateUserById( userId, userData );
  await addressApi.updateBillingAddress( userId, billingAddressData );
  await addressApi.updateShippingAddress( userId, shippingAddressData );

  res.redirect('/user/profile');
});

// PATH para cerrar sesion
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


// Validar que los datos ingresados no sean nulos o vacios
function validateParams( req, res, next ) {
  const userData = req.body;
  const valuesArray = Object.values( userData );

  valuesArray.forEach( value => {
    if( Array.isArray( value ) ){
      value.forEach( valueElement => {
        if( valueElement === '' ) res.redirect('/user/profile-edit');
      });
    }
    else{
      if( value === '' ) res.redirect('/user/profile-edit');
    }
  });
  
  next();
};

module.exports = router;