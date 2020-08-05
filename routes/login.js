var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {

    res.render('pages/login', { 
        title: 'Login',
        login: true
     });
});

router.post('/',passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
    })
);

module.exports = router;
