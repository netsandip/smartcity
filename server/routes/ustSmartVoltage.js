const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var datehelper = require('../helpers/datetimehelper');
var q = require('q');

const SmartVoltageSchema = mongoose.Schema({
    deviceCode: {
        type: Number
    },

    deviceName: {
        type: String
    },

    values: {
        type: Object
    },

    tranDateTime: {
        type: Date
    },

});


//const Device1 = module.exports = mongoose.model('Device1', DeviceSchema, 'DeviceMaster');
const SmartVoltage = module.exports = mongoose.model('SmartVoltage', SmartVoltageSchema, 'TransactionHistory');

//
router.get('/getSmartVoltageGraphData', (req, res) => {
	try {
	var endtime,starttime;
	var d = new Date();
	var devicecode=905;
	var timevals=[];
		var promises=[];
			//console.log(d);
			for (var i=0;i<11;i++){

				var timeformatted="00:"
				if ((i*3)<10){
					timeformatted="0"+i*3;
				}else{
					timeformatted=i*3;
				}
				endtime=datehelper.addgraphsecs(d,-(i*3)+1);
				starttime=datehelper.addgraphsecs(d,-((i+1)*3));

				//console.log(starttime,endtime);
				var aggregatefn=SmartVoltage.aggregate([
				{
					$match: {
						deviceCode : devicecode , tranDateTime:{$lt: endtime, $gte: starttime}
					}
				},
				{$sort: {tranDateTime: -1}},
				{
					$group: {
						_id: "$deviceCode",
						val: { $first: "$values.Data" },
					}
				}
				]).exec()
				
				promises.push(aggregatefn);
				timevals.push({"deviceCode":devicecode,"timehours":"00:"+timeformatted});
			}	
		var counter=0;
		q.all(promises).then(function(result){
			var bookeddata =[];
			result.forEach(function (record) {
				var output={};
				output.DeviceID=timevals[counter].deviceCode;
				output.TranTime=timevals[counter].timehours;
					//console.log('graph',record);
					if(record.length>0){
						output.Data=record[0].val;
						}
					else{
						output.Data=null;
					}
					bookeddata.push(output);
					counter+=1;
				});
			res.json(bookeddata);	
		
		}, function(err){
			return res.status(403).send({ success: false, ustiotmessage: e.message });
		})	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});



module.exports = router;