var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Subject = require('../models/subject');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

//routes for if a user is logged in 
router.get('/profile',isLoggedIn, function (req,res,next) {
     User.findOne({email: req.user.email}, function(err, user) {
        
        if (user.type == "student"){
            Subject.find(function(err, docs) {
                res.render('user/profile', {title: 'TYELE System', subjects: docs});  
            });
        }
        else if (user.type == "teacher"){
            Subject.find({title:{"$in":user.module}},function(err, subject){
            console.log(subject)
                res.render('user/teacher', {title: 'TYELE System', subjects: subject});  
            }); 
        }
        else if (user.type == "admin"){
            res.render('user/admin', {title: 'TYELE System'});
        }
        else if (user.type == "other"){
            User.find({'achievement':{$in:user.requirements}}, function(err,students) {
               res.render('user/achievement', {title: 'TYELE System', students:students}); 
            });
        }
    });
});

//route for when a user is logged out
router.get('/logout',isLoggedIn, function (req,res, next) {
    req.logout();
    res.redirect('/user/signin');
});

router.use('/user/signin', notLoggedIn, function (req, res, next) {
    next();
});


// /route for achievements
router.get('/sAchievement',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/sAchievement');
});

// /route for achievements
router.get('/notification',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/notifi');
});

// /route for subjects
router.get('/subject',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/Subject');
});

// /route for events
//router.get('/events',function (req,res,next) {
   // var messages = req.flash('error');
    //res.render('user/events');
//});
// /route for sign up
router.get('/signupStudent',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signupStudent',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
});

router.post('/signupStudent' , passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signupStudent',
    failureFlash: true
}));

// /route for sign up
router.get('/signupTeacher',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signupTeacher',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
});

router.post('/signupTeacher' , passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signupTeacher',
    failureFlash: true
}));

// /route for sign up
router.get('/signupOther',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signupOther',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
});

router.post('/signupOther' , passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signupOther',
    failureFlash: true
}));

// /route for sign up
router.get('/signupAdmin',function (req,res,next) {
    var messages = req.flash('error');
    res.render('user/signupAdmin',{csrfToken: req.csrfToken(),messages: messages, hasErrors: messages.length >0});
});

router.post('/signupAdmin' , passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signupAdmin',
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

