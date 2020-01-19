const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var datehelper = require('../helpers/datetimehelper');
var q = require('q');

const SmartBinSchema = mongoose.Schema({
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
const SmartBin = module.exports = mongoose.model('SmartBin', SmartBinSchema, 'TransactionHistory');

//
router.get('/getSmartBinGraphData', (req, res) => {
    try {
        var dummysmartbins = 5;
        var totalbins = 6;
        var endtime, starttime;
        var d = new Date();
        var devicecode = 929;
        var devicetime = [];
        var promises = [];

        for (var i = 3; i > -1; i--) {
            endtime = datehelper.addgraphhours(d.getHours() - i + 1);
            starttime = datehelper.addgraphhours(d.getHours() - i);
            var hoursstart = new Date();
            var hoursend = new Date();
            hoursstart.setHours(d.getHours() - i);
            hoursend.setHours(d.getHours() - i + 1);
            var starttimeformatted = datehelper.formatdatepre(hoursstart, 'hh A');
            var endtimeformatted = datehelper.formatdatepre(hoursend, 'hh A');
            var aggregatefn = SmartBin.aggregate([
            {
                $match: {
                    deviceCode: devicecode, tranDateTime: { $lt: endtime, $gte: starttime }
                }
            },
            { $sort: { tranDateTime: -1 } },
            {
                $group: {
                    _id: "$deviceCode",
                    val: { $first: "$values.Data" },
                }
            }
            ]).exec()

            promises.push(aggregatefn);
            devicetime.push({ "deviceCode": devicecode, "timehours": starttimeformatted + " - " + endtimeformatted });
        }
        //console.log(devicetime);
        var counter = 0;
        q.all(promises).then(function (result) {

            var bookeddata = [];
            result.forEach(function (record) {
                var output = {};
                output.DeviceID = devicetime[counter].deviceCode;
                output.Tranhour = devicetime[counter].timehours;
                output.FullBins = dummysmartbins;
                console.log('graph', record[0]);
                if (record.length > 0) {
                    if (record.length > 0) {
                        if (record[0].val == 100) {
                            output.FullBins = 5;
                        }
                        else if (record[0].val == 999) {
                            output.FullBins = output.FullBins + 1;
                        }
                        else {
                            output.FullBins = 5;
                            // output.FullBins = 100 - record[0].val;
                        }
                    }
                    else {
                        output.FullBins = 5;
                    }
                } else {
                    output.FullBins = 5;
                }
                output.AvaiableBins = totalbins - output.FullBins;
                bookeddata.push(output);
                counter += 1;
            });
            console.log(bookeddata);
            var outputdata = {};
            outputdata.graphdata = bookeddata;
            //console.log(bookeddata[bookeddata.length-1]);

            outputdata.AvaiableBins = 1;
            outputdata.FullBins = 5;

            outputdata.AvaiableBins = bookeddata[bookeddata.length - 1].AvaiableBins;
            outputdata.FullBins = bookeddata[bookeddata.length - 1].FullBins;


            res.json(outputdata);

        }, function (err) {
            return res.status(403).send({ success: false, ustiotmessage: e.message });
        })

    } catch (e) { return res.status(403).send({ success: false, ustiotmessage: e.message }); }

});



module.exports = router;