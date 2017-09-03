var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//code for sign up
passport.use('local.signup', new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    
    passReqToCallback: true
},function (req, email, password, done) {
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:7});
    var errors = req.validationErrors();
    if (errors){
        var messages =[];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email},function (err, user) {
        if (err){
            return done(err);
        }
        if (user){
            return done(null, false, {message:'E-mail is already in use'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.type = req.body.accounttype;

        if (newUser.type=='student')
        {}

    else if(newUser.type=='teacher')
    {
        if (req.body.english)
        {
        newUser.module.push("English")
        }
        else if (req.body.german)
        {
        newUser.module.push("German")
        }
       else if (req.body.gaeilge)
        {
        newUser.module.push("Gaeilge")
        }
        else if (req.body.homeEconmics)
        {
        newUser.module.push("Home Economics")
        }
        else if (req.body.business)
        {
        newUser.module.push("Business")
        }
         else if (req.body.maths)
        {
        newUser.module.push("Maths")
        }
         else if (req.body.french)
        {
        newUser.module.push("French")
        }
         else if (req.body.religion)
        {
        newUser.module.push("Religion")
        }
         else if (req.body.history)
        {
        newUser.module.push("History")
        }
         else if (req.body.music)
        {
        newUser.module.push("Music")
        }

    }
    else if(newUser.type=='admin')
    {

    }
    else if(newUser.type=='other')
    {
        if (req.body.workExperience)
        {
        newUser.requirements.push("Work Experience")
        }
        else if (req.body.gardaVetting)
        {
        newUser.requirements.push("Garda Vetting")
        }
       else if (req.body.cprTraining)
        {
        newUser.requirements.push("CPR Training")
        }
        else if (req.body.rugbyCoaching)
        {
        newUser.requirements.push("Rugby Coaching")
        }
        else if (req.body.lifeguard)
        {
        newUser.requirements.push("Lifeguard Coaching")
        }

    }

       

        newUser.save(function (err,resut) {
            if (err){
                return done(err);
            }
               
           return done(null, newUser);
        });
    });
}));

//code for sign in
passport.use('local.signin', new LocalStrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email,password, done) {
    //validation
    req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid Password').notEmpty();
    var errors = req.validationErrors();
    if (errors){
        var messages =[];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    //finding the user
    User.findOne({'email': email},function (err, user) {
        if (err){
            return done(err);
        }
        if (!user){
            return done(null, false, {message:'No user found.'});
        }
        if (!user.validPassword(password)){
            return done(null, false, {message:'Invalid password'});
        }
        return done(null, user);

    });

}));

/*exports.update = function(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  user.findById(req.params.id, function(err, student) {
    if(err) {
      return handleError(res, err);
    }
    if(!user) {
      return res.send(404);
    }
    var updated = _.merge(user, req.body);
    updated.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, user);
    });
  });
};*/