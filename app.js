var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var jwt = require('jsonwebtoken');

//bootstrap deps to app instance as DI container
app.data = require('./services/dataService.js')(app);
app.myRouter = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var authentication_handler = require('./routesHandlers/authenticationHandler.js');

app.myRouter.use(function (req, res, next) {
    authentication_handler(app.data, req, res, next);
});

var data_entity_handler = require('./routesHandlers/dataEntityHandler.js')(app);
//mout data entity routes

app.use('/api/v1/entity', data_entity_handler);

//start server on port 3000
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});

module.export = app;
