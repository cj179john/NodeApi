module.exports = function(data, req, res, next) {
    var header=req.headers.authorization||'',
    token=header.split(/\s+/).pop()||'',
    auth=new Buffer(token, 'base64').toString(),
    credentials=auth.split(/:/);
    var request_user_name = credentials[0];
    var request_user_password = credentials[0];
    data.getData('users', function (err, data) {
        if (err) {
            res.json(err);
            return;
        }

        var user_name = data[0].name;
        var user_password = data[0].password;
        var authenticate =  request_user_name == user_name && user_password == request_user_password;
        if (!authenticate) {
            res.status(401);
            res.json('authentication error');
            return;
        }
        
        next();
    });
};
