var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/about', { 
    title: 'Sobre Nosotros',
    about: true
  });
});

module.exports = router;