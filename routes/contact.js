var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/contact', {
    title: 'Contacto',
    contact: true
   });
});

module.exports = router;