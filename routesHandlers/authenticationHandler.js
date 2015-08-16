module.exports = function(data, req, res, next) {
    var request_user_name = req.query.user;
    var request_user_password = req.query.password;
    data.getData('users', function (err, data) {
        if (err) {
            res.json(err);
            return;
        }

        var user_name = data[0].name;
        var user_password = data[0].password;
        var authenticate =  request_user_name == user_name && user_password == request_user_password;
        if (!authenticate) {
            res.send('authentication error');
            return;
        }
        
        next();
    });
};
