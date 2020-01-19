
var mongoose = require('mongoose');
module.exports =  mongoose.Schema({
	TranNo:Number,
	projectCode:Number,
	ProjectName:String,
	deviceCode:Number,
	deviceName:String,
	values:Object,
	Transtype:Number,
	tranDateTime:Date,
	Created_On:Date,
    Created_by:String
});