var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config.js');

//bootstrap deps to app instance as DI container
app.data = require('./services/dataService.js')(app);
app.myRouter = express.Router();

//load config
var env = process.env.NODE_ENV;
app.config = config[env];

//convert request and respond bodies to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var authentication_handler = require('./routesHandlers/authenticationHandler.js');
//authentication
app.myRouter.use(function (req, res, next) {
    authentication_handler(app.data, req, res, next);
});

var data_entity_handler = require('./routesHandlers/dataEntityHandler.js')(app);
//mout data entity routes
app.use('/api/v1/entity', data_entity_handler);

var not_found_handler = require('./routesHandlers/notfoundDataHandler.js');
//error catcher
app.use(function (req, res) {
   not_found_handler(req, res);
});

//start server on port 3000
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});

module.export = app;
