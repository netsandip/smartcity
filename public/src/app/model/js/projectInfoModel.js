var mongoose = require('mongoose');
module.exports =  mongoose.Schema({
	Code: Number,
	Name: String,
    Active: String,
    Created_On:Date,
    Created_by:String,
    Modified_On:Date,
    Modified_by:String
});