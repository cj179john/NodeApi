// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var data = require('../services/dataService.js')();

passport.use(new BasicStrategy(
  function(request_username, request_password, callback) {
    data.getData('users', function (err, user) {
        if (err) {
            callback(err);
        }
        var user_name = user[0].name;
        var user_password = user[0].password;
        var authenticate =  request_username == user_name && user_password == request_password;
        if (!authenticate) {
            callback(err);
        }
        return callback(null, user);
    });
  }
));
exports.isAuthenticated = passport.authenticate('basic', { session : false });

