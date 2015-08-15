module.exports = function(data, req, res, next) {
    var authenticated  = function () {
        var request_user_name = req.query.user;
        var request_user_password = req.query.password;
        var user_name = data.getData('users')[0].name;
        var user_password = data.getData('users')[0].password;
        return request_user_name == user_name && user_password == request_user_password;
    };
    if (!authenticated()) { 
        res.send('authentication error');
        return;
    } 
    next();
};
