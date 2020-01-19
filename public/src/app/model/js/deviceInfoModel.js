
var mongoose = require('mongoose');
module.exports =  mongoose.Schema({
	Code: Number,
	Name: String,
	DeviceID:String,
	DeviceState:Number,
	Manufacturer:String,
	ModelNumber:String,
	SerialNumber:String,
	FirmwareVersion:String,
	Processor:String,
	InstalledRAM:String,
	Latitude:Number,
    Longitude: Number,
    ProjectCode: Number,
    Created_On:Date,
    Created_by:String,
    Modified_On:Date,
    Modified_by:String,
});