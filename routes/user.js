var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Subject = require('../models/subject');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn, function (req,res,next) {
    Subject.find(function(err, docs) {
        var subjectChunks = [];
        var chunkSize = 3;

        for (var i = 0; i < docs.length; i += chunkSize) {
            subjectChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('user/profile', {title: 'TYELE System', subjects: subjectChunks});
    });
    });

router.get('/logout',isLoggedIn, function (req,res, next) {
    req.logout();
    res.redirect('/user/signin');
});

router.use('/user/signin', notLoggedIn, function (req, res, next) {
    next();
});

// /route for sign up
router.get('/signup',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
});

router.post('/signup' , passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

//routes for signin

router.get('/signin', function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
});

router.post('/signin', passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req,res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/signin');
}

function notLoggedIn(req,res, next) {
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/signin');
}