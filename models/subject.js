var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//blueprint for each new entry in the db
var schema = new Schema({
    imagePath: {type:String, required: true},
    title: {type:String, required: true},
    
});


module.exports = mongoose.model('Subject', schema);