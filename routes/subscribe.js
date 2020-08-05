var express = require('express');
var router = express.Router();
const mailchimp = require('../mailchimp/api');

router.post('/', (req, res, next) => {
    mailchimp( req, res );
    // res.redirect('/');
});

module.exports = router;