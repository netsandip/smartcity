const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var datehelper = require('../helpers/datetimehelper');
var q = require('q');

const SmartCurrentSchema = mongoose.Schema({
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
const SmartCurrent = module.exports = mongoose.model('SmartCurrent', SmartCurrentSchema, 'TransactionHistory');

//
router.get('/getSmartCurrentGraphData', (req, res) => {
	try {
	var outputdata = [
            { "DeviceID": 901, "Data": -10, "TranTime": "00:00" },
            { "DeviceID": 901, "Data": 10, "TranTime": "00:03" },
            { "DeviceID": 901, "Data": -12, "TranTime": "00:09" },
            { "DeviceID": 901, "Data": 9, "TranTime": "00:12" },
            { "DeviceID": 901, "Data": -5, "TranTime": "00:15" },
			{"DeviceID": 901,"Data": 7, "TranTime": "00:18"            },
			{"DeviceID": 901, "Data": 3, "TranTime": "00:21"            }, 
			{ "DeviceID": 901, "Data": 6, "TranTime": "00:24"            },
			{"DeviceID": 901, "Data": 12,"TranTime": "00:27"            }, 
			{"DeviceID": 901,"Data": -6,"TranTime": "00:30"            }, 
			{ "DeviceID": 902, "Data": 10, "TranTime": "00:00" },
            { "DeviceID": 902, "Data": -13, "TranTime": "00:03" },
            { "DeviceID": 902, "Data": 12, "TranTime": "00:06" },
            { "DeviceID": 902, "Data": -19, "TranTime": "00:09" },
            { "DeviceID": 902, "Data": 10, "TranTime": "00:12" },
            { "DeviceID": 902, "Data": -20, "TranTime": "00:15" },
            { "DeviceID": 902, "Data": 10, "TranTime": "00:18" },
            { "DeviceID": 902, "Data": 10, "TranTime": "00:21" },
            { "DeviceID": 902, "Data": 5, "TranTime": "00:24" },
            { "DeviceID": 902, "Data": -5, "TranTime": "00:27" },
            { "DeviceID": 902, "Data": 7, "TranTime": "00:30" }
        ];
	res.json(outputdata);
	
	
	} catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }
	
});



module.exports = router;