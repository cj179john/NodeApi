var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config.js');
var cors = require('cors');
var events = require('events');

//enable all cors call
app.use(cors());

//event emitter 
app.eventEmitter = new events.EventEmitter();
require('./services/eventService.js')(app.eventEmitter);

//bootstrap deps to app instance as DI container
app.data = require('./services/dataService.js')(app);
app.myRouter = express.Router();

//load config
var env = process.env.NODE_ENV? process.env.NODE_ENV : 'development';
app.config = config[env];

//convert request and respond bodies to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//authentication
var authentication_handler = require('./routesHandlers/authenticationHandler.js');
app.myRouter.use(function (req, res, next) {
    authentication_handler(app.data, req, res, next);
});

//mout data entity routes
var data_entity_handler = require('./routesHandlers/dataEntityHandler.js')(app);
app.use('/api/v1/entity', data_entity_handler);

//error catcher
var not_found_handler = require('./routesHandlers/notfoundDataHandler.js');
app.use(function (req, res) {
   not_found_handler(req, res, app.eventEmitter);
});

//start server on port 3000
var server = app.listen(app.config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
});

process.on('uncaughtException', function(err){
    console.log(err);
    //Send some notification about the error  
    process.exit(1);
});

exports = module.exports = app;
