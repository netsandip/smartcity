const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('./config/database');
const mqtt = require('mqtt');
const EventEmitter = require('events');
mongoose.Promise = Promise;


const ee = new EventEmitter();

mongoose.connect(config.database);
// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});


// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();
const port = 3778;

const ustIoTGraph = require('./routes/ustIoTGraph');
const ustSmartParking = require('./routes/ustSmartParking');
const ustSmartBin = require('./routes/ustSmartBin');
const ustSmartVoltage = require('./routes/ustSmartVoltage');
const ustSmartCurrent = require('./routes/ustSmartCurrent');
//MIDDLEWARE
app.use(cors());//run on diff port

//app.use(bodyParser.json());//grab data from frontend


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));

app.use(passport.initialize());
app.use(passport.session());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//ROUTING

app.use('/ustIoTGraph', ustIoTGraph);
app.use('/ustSmartParking', ustSmartParking);
app.use('/ustSmartBin', ustSmartBin);
app.use('/ustSmartCurrent', ustSmartCurrent);
app.use('/ustSmartVoltage', ustSmartVoltage);

app.use(clientErrorHandler);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

//every route goes to index  except declared
app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, 'angular-cli/src/index.html'));
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

// Handle Error
// Handle errors
app.use((err, req, res, next) => {
    if (! err) {
        return next();
    }

    res.status(500);
    res.send('500: Internal server error');
});

// clientError Handler
function clientErrorHandler (err, req, res, next) {
   if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
    } else {
      next(err)
   }
}