var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
//var contactEvent = require("events.js")



var userSchema = new Schema({
	name: {type:String},
    email: {type:String, required: true},
    password: {type:String, required:true},
    type: {type:String},
    achievement: [String],
    module:[String],
    requirements:[String],
    description:[String]

});

//creating an encrypted password
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

//method to check if password given matches the hashed password
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
