const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var datehelper = require('../helpers/datetimehelper');
var q = require('q');
var prevrecord;

const SmartParkSchema = mongoose.Schema({

    TranNo: {
        type: Number
    },

    projectCode: {
        type: Number
    },

    ProjectName: {
        type: String
    },

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

const DeviceSchema = mongoose.Schema({

    DeviceID: {
        type: String
    },

    Name: {
        type: String
    },
    Active: {
        type: String
    },
});
const Device = module.exports = mongoose.model('Device', DeviceSchema, 'DeviceMaster');
const SmartPark = module.exports = mongoose.model('SmartPark', SmartParkSchema, 'TransactionHistory');

//
router.get('/getSmartParkingGraphData', (req, res) => {
	try {
		
	var endtime,starttime;
	var d = new Date();
	var devicetime=[];
	var devices=[];
	var dummyparkingslots=11;
	prevrecord=null;
	Device.find({"Name": { $regex: /parking/i}}).exec(function(err, docs) { 
		
		docs.forEach(function (doc) {
		devices.push({"deviceCode":doc.DeviceID,"deviceName":doc.Name});
		});
	//res.json(docs);
	
		var promises=[];
		for (var dev=0;dev<devices.length;dev++){
			
			for (var i=3;i>-1;i--){
				endtime=datehelper.addgraphhours(d.getHours()-i+1);
				starttime=datehelper.addgraphhours(d.getHours()-i);
				var hoursstart=new Date();
				var hoursend=new Date();
				hoursstart.setHours(d.getHours() - i);
				hoursend.setHours(d.getHours() - i+1);
				var starttimeformatted=datehelper.formatdatepre(hoursstart,'hh A');
				var endtimeformatted=datehelper.formatdatepre(hoursend,'hh A');
				//console.log(starttime,starttimeformatted+" - "+ endtimeformatted);
				//var dbfn=SmartPark.find({"deviceName": { $regex: /parking/i}, "tranDateTime":{$gt: starttime, $lt: endtime}} ).sort({deviceName:1,tranDateTime: -1}).exec()
				var dbfn=SmartPark.find({"deviceCode": devices[dev].deviceCode, "tranDateTime":{$gt: starttime, $lt: endtime}} ).sort({tranDateTime: 1}).exec()
				promises.push(dbfn);
				devicetime.push({"deviceCode":devices[dev].deviceCode,"timehours":starttimeformatted +" - "+ endtimeformatted});
			}	
		}
		//console.log(devicetime);
		var counter=0;
		q.all(promises).then(function(result){
			var bookeddata =[];
			result.forEach(function (record) {
				var output={};
				output.DeviceID=devicetime[counter].deviceCode;
				output.Tranhour=devicetime[counter].timehours;
					//console.log('graph',record);
					if(record.length>0){
						output.BookedCount=getParkingVehicleCount(record)+dummyparkingslots;			
						}else{
						output.BookedCount=0+dummyparkingslots;
					}
					bookeddata.push(output);
					counter+=1;
				});
		res.json(bookeddata);	
		
		}, function(err){
			return res.status(403).send({ success: false, ustiotmessage: e.message });
		})
	/**/
	});
		
	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

function getParkingVehicleCount(records){

	var count=0;
	records.forEach(function (record) {
		
		if (prevrecord!=null){
			if (prevrecord.values.Data!=record.values.Data && record.values.Data==1) {
				count+=1;
			}
		}else {
			//console.log(prevrecord,record);
		}
		prevrecord=record;
	});
	return count
}
// , tranDateTime:{$lt: graphdates[1], $gte: starttime}

router.get('/getSmartParkingGraphData1', (req, res) => {
	try {
	var bookeddata=[];
bookeddata.push({"DeviceID":101,"BookedCount":10,"Tranhour":"11 AM-12 PM"});	
bookeddata.push({"DeviceID":101,"BookedCount":14,"Tranhour":"10 AM-11 AM"});	
bookeddata.push({"DeviceID":101,"BookedCount":20,"Tranhour":"9 AM-10 AM"});	
bookeddata.push({"DeviceID":101,"BookedCount":4,"Tranhour":"8 AM-9 AM"});	
bookeddata.push({"DeviceID":102,"BookedCount":20,"Tranhour":"11 AM-12 PM"});	
bookeddata.push({"DeviceID":102,"BookedCount":1,"Tranhour":"10 AM-11 AM"});	
bookeddata.push({"DeviceID":102,"BookedCount":30,"Tranhour":"9 AM-10 AM"});	
bookeddata.push({"DeviceID":102,"BookedCount":18,"Tranhour":"8 AM-9 AM"});	
	
    res.json(bookeddata);	

	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

router.get('/getSmartParkingViewData', (req, res) => {
	try {
		var dummyparkingslots=11;
		var totalslots=12;
		SmartPark.aggregate([
		{$match: {"deviceName": { $regex: /parking/i}}},
		// Sort the docs by lastUpdate descending to put the newest ones first.
		{$sort: {tranDateTime: -1}},
		// Group on deviceCode, taking the first (newest) doc for each file name.
		{$group: {
			_id: '$deviceCode',
			val: {$first: '$values.Data'}
		}}
	], function(err, docs) {
			//console.log(docs);
			var bookeddata=[
			{
			   "parkingslot":"A",   "rowlist": [{ "DeviceId": "101","Row": "0", "isBooked": "0" },
					{"DeviceId": "201", "Row": "1", "isBooked": "1" },{"DeviceId": "202", "Row": "1", "isBooked": "1" },{"DeviceId": "203", "Row": "1", "isBooked": "1" },
					{"DeviceId": "204", "Row": "1", "isBooked": "1" },{"DeviceId": "205", "Row": "2", "isBooked": "1" },{"DeviceId": "206", "Row": "2", "isBooked": "1" },
					{"DeviceId": "207", "Row": "1", "isBooked": "1" },{"DeviceId": "208", "Row": "1", "isBooked": "1" },{"DeviceId": "209", "Row": "1", "isBooked": "1" },
					{"DeviceId": "210", "Row": "1", "isBooked": "1" },{"DeviceId": "211", "Row": "2", "isBooked": "1" }
				]
			},
			{
				"parkingslot":"B", "rowlist": [{ "DeviceId": "102","Row": "0", "isBooked": "0" },
					{"DeviceId": "212", "Row": "1", "isBooked": "1" },{"DeviceId": "213", "Row": "1", "isBooked": "1" },{"DeviceId": "214", "Row": "1", "isBooked": "1" },
					{"DeviceId": "215", "Row": "1", "isBooked": "1" },{"DeviceId": "216", "Row": "2", "isBooked": "1" },{"DeviceId": "217", "Row": "2", "isBooked": "1" },
					{"DeviceId": "218", "Row": "1", "isBooked": "1" },{"DeviceId": "219", "Row": "1", "isBooked": "1" },{"DeviceId": "220", "Row": "1", "isBooked": "1" },
					{"DeviceId": "221", "Row": "1", "isBooked": "1" },{"DeviceId": "222", "Row": "2", "isBooked": "1" }
				]
			}     
			]; 
			bookeddata.forEach(function (devices) { 
			//console.log(devices.rowlist);
			devices.TotalAvailableslots=totalslots-dummyparkingslots;
			devices.rowlist.forEach(function (device) { 
					docs.forEach(function (slotdata) { 
						if (device.DeviceId==slotdata._id) {
							device.isBooked=slotdata.val;
							devices.TotalAvailableslots-=slotdata.val;
							//device.Row="100";
							//next;
						}
					});	
				});	
			});	
	
			res.json(bookeddata);	
		// docs contains your desired result
	})	
		
	

	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});




module.exports = router;