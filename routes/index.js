var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

var Subject = require('../models/subject');

/* GET home page. */
router.get('/', function(req, res, next) {
    Subject.find(function(err, docs){
      var subjectChunks = [];
      var chunkSize = 3;

      for (var i =0; i < docs.length; i+=chunkSize){
        subjectChunks.push(docs.slice(i,i + chunkSize));
     }
        var messages = req.flash('error');
        res.render('user/signin',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
    });
});





module.exports = router;
