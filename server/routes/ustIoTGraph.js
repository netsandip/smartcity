const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var datehelper = require('../helpers/datetimehelper');
var q = require('q');

const GraphTransSchema = mongoose.Schema({

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

const GraphTrans = module.exports = mongoose.model('GraphTrans', GraphTransSchema, 'TransactionHistory');


router.get('/getDeviceInformation', (req, res) => {
	
	GraphTrans.find({}, function (err, docs) {
		res.json(docs);
  // docs is an array
});
    
});

//To get Fleet Data
router.get('/getGPSInformation', (req, res) => {

    try {

        GraphTrans.find({ "deviceName": { $regex: /GPS/i } }).limit(100).sort({ "tranDateTime": -1 }).limit(100).exec(function (err, docs) {

            if (docs.length > 0) {

                var gpsdata = [];
                var i = 0;
                docs.forEach(function (record) {
                    var gpsRecdata = {};
                    gpsRecdata.DeviceID = record.deviceCode;
                    gpsRecdata.Data = record.values;

                    gpsdata.push(gpsRecdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(gpsdata);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Live Graph APi Call

//For Temperature Graph
router.get('/getGPSInformation', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /GPS/i } }).sort({ "tranDateTime": -1 }).exec(function (err, docs) {

            if (docs.length > 0) {


                var GpsTrangraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var gpsTrangraphdata = {};
                    gpsTrangraphdata.DeviceID = record.deviceCode;
                    gpsTrangraphdata.Data = record.values[0];
                    gpsTrangraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    gpsTrangraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    GpsTrangraph.push(gpsTrangraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(GpsTrangraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//{$match: {deviceCode: {$in: [902,901,903,904,907,912]},tranDateTime:{$lt:filterdate}}},


router.get('/getSmartCityWeather/', (req, res) => {
    try {

        var weatherdate = req.query['weatherdate'];
        var weatherdata = {};
        if (weatherdate == undefined) {
            weatherdate = new Date();
        }

        var filterdate = datehelper.adddays(weatherdate, 1);
        GraphTrans.aggregate([
            { $sort: { tranDateTime: -1 } },
            { $match: { deviceCode: { $in: [902,901,903,904,907,912] }, tranDateTime: { $lt: filterdate } } },
            // Sort the docs by lastUpdate descending to put the newest ones first.

            // Group on deviceCode, taking the first (newest) doc for each file name.
            {
                $group: {
                    _id: '$deviceCode',
                    val: { $first: '$values.Data' }
                }
            }
        ], function (err, docs) {
            if (docs != undefined && docs != null && docs != "") {
                
                docs.forEach(function (row) {
                    if (row._id == 902) {
                        weatherdata.Temperature = row.val;
                    } else if (row._id == 901) {
                        weatherdata.Humidity = row.val;
                    } else if (row._id == 903) {
                        weatherdata.Light = row.val;
                    } else if (row._id == 904) {
                        weatherdata.Rain = row.val;
                    } else if (row._id == 907) {
                        weatherdata.WaterLevel = row.val;
                    }
                    else if (row._id == 912) {
                        weatherdata.WindSpeed = row.val;
                    }


                });
                res.json(weatherdata);
            }
            else {
                GraphTrans.aggregate([
                    { $sort: { tranDateTime: -1 } },
                    { $match: { deviceCode: { $in: [902,901,903,904,907,912] } } },
                    // Sort the docs by lastUpdate descending to put the newest ones first.

                    // Group on deviceCode, taking the first (newest) doc for each file name.
                    {
                        $group: {
                            _id: '$deviceCode',
                            val: { $first: '$values.Data' }
                        }
                    }
                ], function (err, docs) {

                    docs.forEach(function (row) {
                       if (row._id == 902) {
                        weatherdata.Temperature = row.val;
                    } else if (row._id == 901) {
                        weatherdata.Humidity = row.val;
                    } else if (row._id == 903) {
                        weatherdata.Light = row.val;
                    } else if (row._id == 904) {
                        weatherdata.Rain = row.val;
                    } else if (row._id == 907) {
                        weatherdata.WaterLevel = row.val;
                    }
                    else if (row._id == 912) {
                        weatherdata.WindSpeed = row.val;
                    }


                    });
                    res.json(weatherdata);
                })
            }

            // docs contains your desired result
        })
    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

router.get('/getSmartdustbinlatestdata', (req, res) => {
	try {
	
	GraphTrans.find({"deviceCode" : 929}).limit(1).sort({tranDateTime: -1}).exec(function(err, docs) { 
	if (docs.length>0){
		var smartlatestbin={};
		var rowlist=[];
		rowlist.push({ "Row": "0", "isBooked": "1", "full": docs[0].values.Data,"DeviceID":docs[0].deviceCode });
		smartlatestbin.rowlist=rowlist;
		//res.json({"DeviceID":docs[0].deviceCode,"Data":docs[0].values.Data,"TranNo" : docs[0].TranNo});
		res.json(smartlatestbin);
	}
	else {
		
	}
	
	});
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

router.get('/getSmartdustbinlist',(req, res)=>{
	try {
	var smartbin= [{
             "rowlist": [{  "Row": "0", "deviceCode": "908", "full":"0" },
                { "Row": "1", "deviceCode": "0", "full": "0" },
                { "Row": "2", "deviceCode": "0", "full": "0" }
            ]
        },
        {
            "rowlist": [{ "Row": "0", "deviceCode": "1", "full": "0" },
                { "Row": "1", "deviceCode": "0", "full": "0" },
                { "Row": "2", "deviceCode": "0", "full": "0"}
            ]
        }	];
	
	res.json(smartbin);
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
	
});
//,tranDateTime:{$lt: graphdates[1], $gte: graphdates[0]}
router.get('/getSmartdustbindata', (req, res) => {
	try {
	
	var graphdates,starttime;
	var d = new Date();
	
	graphdates=datehelper.addgraphdays(-8);
	
	GraphTrans.find({"deviceCode" : 908,"tranDateTime":{$gt: graphdates[1], $lt: graphdates[0]}}).sort({tranDateTime: -1}).exec(function(err, docs) { 
	
	var smartbin=[];
 if (docs.length > 0) {
	docs.forEach(function(record){
		var smartbindata={};
		smartbindata.DeviceID=record.deviceCode;
		smartbindata.Data=record.values.Data;
		smartbindata.TranDt=datehelper.formatdate(record.tranDateTime);
		
		smartbin.push(smartbindata);
	});	
}
	
	res.json(smartbin);
	});

	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

//For Smartbin Product - for Mobile App
router.post('/getSmartbinProddata', (req, res) => {
	try {
	
	var graphdates,starttime;
	var d = new Date();
	

	//var ProjectCode = req.body.Code;
	var DeviceCode = req.body.DeviceID;
	
	//console.log(ProjectCode);
	console.log(DeviceCode.toString());
	
	graphdates=datehelper.addgraphdays(-8);
	
	GraphTrans.find({"deviceCode":DeviceCode ,"tranDateTime":{$gt: graphdates[1], $lt: graphdates[0]}}).sort({tranDateTime: -1}).limit(1).exec(function(err, docs) { 
	
	var smartbin=[];
	docs.forEach(function(record){
		var smartbindata={};
		smartbindata.DeviceID=record.deviceCode;
		smartbindata.Data=record.values.Data;
		smartbindata.TranDt=datehelper.formatdateddmmyyyyhhmmss(record.tranDateTime);
		
		smartbin.push(smartbindata);
	});	
	
	res.json(smartbin);
	});

	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});




//For Smartbin Product - for Mobile/ Web App
router.get('/getSmartbinProdWebdata', (req, res) => {
	try {
	
	var graphdates,starttime;
	var d = new Date();
	

	//var ProjectCode = req.body.Code;
	var DeviceCode = "929";
	
	//console.log(ProjectCode);
	console.log(DeviceCode.toString());
	
	graphdates=datehelper.addgraphdays(-8);
	
	GraphTrans.find({"deviceCode":DeviceCode}).sort({tranDateTime: -1}).limit(1).exec(function(err, docs) { 
	var smartbin=[];
	docs.forEach(function(record){
console.log(record);
		var smartbindata={};
		smartbindata.DeviceID=record.deviceCode;
		smartbindata.Data=record.values.Data;
		smartbindata.TranDt=datehelper.getmystime(record.tranDateTime);
		smartbin.push(smartbindata);
	});	
	
	res.json(smartbin);
	});

	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

//For beer Product - for Mobile/ Web App
router.get('/getbeerProdWebdata', (req, res) => {
	try {
	
	var graphdates,starttime;
	var d = new Date();
	

	//var ProjectCode = req.body.Code;
	var DeviceCode = "943";
	
	//console.log(ProjectCode);
	console.log(DeviceCode.toString());
	
	graphdates=datehelper.addgraphdays(-8);
	
	GraphTrans.find({"deviceCode":DeviceCode}).sort({tranDateTime: -1}).limit(1).exec(function(err, docs) { 
	
	var smartbin=[];
	docs.forEach(function(record){
		var smartbindata={};
		smartbindata.DeviceID=record.deviceCode;
		smartbindata.Data=record.values.Data;
		smartbindata.TranDt=datehelper.getmystime(record.tranDateTime);
		smartbin.push(smartbindata);
	});	
	
	res.json(smartbin);
	});

	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});


//For Live Graph APi Call

//For Temperature Graph
router.get('/getliveTempGraphData', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /Temp/i } }).limit(10).sort({ "tranDateTime": -1 }).exec(function (err, docs) {



            if (docs.length > 0) {


                var temperaturegraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var temperaturegraphdata = {};
                    temperaturegraphdata.DeviceID = record.deviceCode;
                    temperaturegraphdata.Data = record.values.Data;
                    temperaturegraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    temperaturegraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    temperaturegraph.push(temperaturegraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(temperaturegraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Temperature Graph Min and Max
router.get('/getliveTempGraphDatamaxmin', (req, res) => {
    try {


        GraphTrans.aggregate([
         { "$match": { "deviceName": { $regex: /Temp/i } } },
         { "$sort": { "tranDateTime": -1 } },
         { "$limit": 10 },
         {
             "$group": {
                 "_id": null,
                 "max": { "$max": "$values.Data" },
                 "min": { "$min": "$values.Data" }
             }
         }
        ]).exec(function (err, docs) {



            if (docs.length > 0) {
                res.json(docs);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});



//For Live Graph APi Call

//For Humidity Graph
router.get('/getliveHumidityGraphData', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /Humidity/i } }).limit(10).sort({ "tranDateTime": -1 }).exec(function (err, docs) {



            if (docs.length > 0) {

                var humiditygraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var humiditygraphdata = {};
                    humiditygraphdata.DeviceID = record.deviceCode;
                    humiditygraphdata.Data = record.values.Data;
                    humiditygraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    humiditygraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    humiditygraph.push(humiditygraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(humiditygraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Humidity Graph Min and Max
router.get('/getliveHumidityGraphDatamaxmin', (req, res) => {
    try {


        GraphTrans.aggregate([
         { "$match": { "deviceName": { $regex: /Humidity/i } } },
         { "$sort": { "tranDateTime": -1 } },
         { "$limit": 10 },
         {
             "$group": {
                 "_id": null,
                 "max": { "$max": "$values.Data" },
                 "min": { "$min": "$values.Data" }
             }
         }
        ]).exec(function (err, docs) {



            if (docs.length > 0) {
                res.json(docs);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});


//For Live Graph APi Call

//For Light Graph
router.get('/getliveLightGraphData', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /Light/i } }).limit(10).sort({ "tranDateTime": -1 }).exec(function (err, docs) {

            if (docs.length > 0) {

                var lightgraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var lightgraphdata = {};
                    lightgraphdata.DeviceID = record.deviceCode;
                    lightgraphdata.Data = record.values.Data;
                    lightgraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    lightgraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    lightgraph.push(lightgraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(lightgraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Light Graph Min and Max
router.get('/getliveLightGraphDatamaxmin', (req, res) => {
    try {


        GraphTrans.aggregate([
         { "$match": { "deviceName": { $regex: /Light/i } } },
         { "$sort": { "tranDateTime": -1 } },
         { "$limit": 10 },
         {
             "$group": {
                 "_id": null,
                 "max": { "$max": "$values.Data" },
                 "min": { "$min": "$values.Data" }
             }
         }
        ]).exec(function (err, docs) {



            if (docs.length > 0) {
                res.json(docs);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});



//For Live Graph APi Call

//For Rain Graph
router.get('/getliveRainGraphData', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /Rain/i } }).limit(10).sort({ "tranDateTime": -1 }).exec(function (err, docs) {

            if (docs.length > 0) {

                var raingraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var raingraphdata = {};
                    raingraphdata.DeviceID = record.deviceCode;
                    raingraphdata.Data = record.values.Data;
                    raingraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    raingraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    raingraph.push(raingraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(raingraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Light Graph Min and Max
router.get('/getliveRainGraphDatamaxmin', (req, res) => {
    try {


        GraphTrans.aggregate([
         { "$match": { "deviceName": { $regex: /Rain/i } } },
         { "$sort": { "tranDateTime": -1 } },
         { "$limit": 10 },
         {
             "$group": {
                 "_id": null,
                 "max": { "$max": "$values.Data" },
                 "min": { "$min": "$values.Data" }
             }
         }
        ]).exec(function (err, docs) {



            if (docs.length > 0) {
                res.json(docs);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});



//For Live Graph APi Call

//For Voltage Graph
router.get('/getliveVoltageGraphData', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /voltage/i } }).limit(10).sort({ "tranDateTime": -1 }).exec(function (err, docs) {

            if (docs.length > 0) {

                var voltagegraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var voltagegraphdata = {};
                    voltagegraphdata.DeviceID = record.deviceCode;
                    voltagegraphdata.Data = record.values.Data;
                    voltagegraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    voltagegraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    voltagegraph.push(voltagegraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(voltagegraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Light Graph Min and Max
router.get('/getliveVoltageGraphDatamaxmin', (req, res) => {
    try {


        GraphTrans.aggregate([
         { "$match": { "deviceName": { $regex: /voltage/i } } },
         { "$sort": { "tranDateTime": -1 } },
         { "$limit": 10 },
         {
             "$group": {
                 "_id": null,
                 "max": { "$max": "$values.Data" },
                 "min": { "$min": "$values.Data" }
             }
         }
        ]).exec(function (err, docs) {



            if (docs.length > 0) {
                res.json(docs);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});


//For Current Graph
router.get('/getliveCurrentGraphData', (req, res) => {
    try {

        GraphTrans.find({ "deviceName": { $regex: /current/i } }).limit(10).sort({ "tranDateTime": -1 }).exec(function (err, docs) {

            if (docs.length > 0) {

                var currentgraph = [];
                var i = 0;
                docs.forEach(function (record) {
                    var currentgraphdata = {};
                    currentgraphdata.DeviceID = record.deviceCode;
                    currentgraphdata.Data = record.values.Data;
                    currentgraphdata.Trantime = datehelper.formatdatehhmmss(record.tranDateTime);
                    currentgraphdata.TranDt = datehelper.formatdate(record.tranDateTime);

                    currentgraph.push(currentgraphdata);
                    if (i == 0) {
                        i = 1;
                    } else {
                        i = 0;
                    };
                });

                res.json(currentgraph);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});

//For Current Graph Min and Max
router.get('/getliveCurrentGraphDatamaxmin', (req, res) => {
    try {


        GraphTrans.aggregate([
         { "$match": { "deviceName": { $regex: /current/i } } },
         { "$sort": { "tranDateTime": -1 } },
         { "$limit": 10 },
         {
             "$group": {
                 "_id": null,
                 "max": { "$max": "$values.Data" },
                 "min": { "$min": "$values.Data" }
             }
         }
        ]).exec(function (err, docs) {



            if (docs.length > 0) {
                res.json(docs);
            }
            // res.json("No data found");
        });

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});



//deviceName: { $regex: '.*parking.*' },
//, "tranDateTime":{$gt: graphdates[1], $lt: graphdates[0]}
router.get('/getSmartparkingdata', (req, res) => {
	try {
	
	var graphdates,starttime;
	var d = new Date();
	
	graphdates=datehelper.addgraphdays(-20);
	
	GraphTrans.find({"deviceName": { $regex: /parking/i}, "tranDateTime":{$gt: graphdates[1], $lt: graphdates[0]}}).sort({tranDateTime: -1}).exec(function(err, docs) { 
	
	var smartpark=[];
	var i=0;
	docs.forEach(function(record){
		var smartparkdata={};
		smartparkdata.DeviceID=record.deviceCode;
		smartparkdata.Data=i;
		
		smartparkdata.TranDt=datehelper.formatdate(record.tranDateTime);
		
		smartpark.push(smartparkdata);
		if (i==0){
			i=1;
		}else {
			i=0;
		};
	});	
	
	res.json(smartpark);
	});

	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

router.get('/getTempGraphData', (req, res) => {
	try {
		
	var graphdates,starttime;
	var d = new Date();
	
	starttime=datehelper.cleandatetz(d);
	
	var promises=[];
	for (var i=1;i<=12;i++){
		graphdates=datehelper.getgraphdates(i*2);
		//console.log(graphdates[1]);
		var aggregatefn=GraphTrans.aggregate([
        {
            $match: {
                deviceCode : 901 , tranDateTime:{$lt: graphdates[1], $gte: starttime}
            }
        },
        {
            $group: {
                _id: null,
                minval: { $min: "$values.Data" },
				maxval: { $max: "$values.Data" },
				
            }
        }
		]).exec()
		promises.push(aggregatefn);
		starttime=graphdates[1];
	}	
	
	q.all(promises).then(function(result){
		var mindata =[],maxdata=[];output={};
		result.forEach(function (record) {
                if(record.length>0){
					mindata.push(record[0].minval);
					maxdata.push(record[0].maxval);
				}else{
					mindata.push(0);
					maxdata.push(0);
				}
            });
		output.mindata=mindata;
		output.maxdata=maxdata;
		
    res.json(output);	
	
}, function(err){
    return res.status(403).send({ success: false, ustiotmessage: e.message });
})
	
	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});

function convertdevicedatatojson(data){
	var values={};
	var startindex=19;
	if (data.indexOf("{")<0){
		startindex=18;
	}
	var val=data.substr(startindex,data.length);
	var dataend = val.indexOf("}");
		
	values.Trans=1,
	values.Data=data.substr(startindex,dataend);

	return values;
	
}

router.get('/updateInvalidData', (req, res) => {
	try {	
	const query = {$where: "this.values.length > 20"};
	GraphTrans.find(query)
	//.sort({'_id': -1})
	//.limit(9000)
	.exec(function(err, docs) {
		docs.forEach(function(record, index) {
		//console.log("before",record);
		record.values=convertdevicedatatojson(record.values);	
		record.save(function (err) {
			if (err) {
				console.error(err);
			}
			else {
				//console.log("success",record);
			}
		});
		});
		res.json({"success":true});	
		 // `posts` will be of length 20
	});
	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});



module.exports = router;