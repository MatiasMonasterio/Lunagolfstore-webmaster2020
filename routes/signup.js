var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('pages/login', { 
        title: 'Sign up',
        login: true,
        signup: true
     });
});

router.post('/', passport.authenticate('local-signup', {
        successRedirect: '/user/profile-edit',
        failureRedirect: '/signup',
        passReqToCallback: true
    })
);

module.exports = router;