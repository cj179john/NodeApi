module.exports = function(app) {
    var data = app.data;

    app.myRouter.get('/:entity', function(req, res, next) {
        var entity = req.params.entity;
        var entity_data = data.getData(entity);
        res.json(entity_data);
    });
    app.myRouter.put('/:entity', function(req, res, next) {
        res.json('update');
    });
    app.myRouter.delete('/:entity', function(req, res, next) {
        res.json('delete');
    });
    app.myRouter.post('/:entity', function(req, res, next) {
        var entity = req.params.entity;
        var queryData = '';
        req.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = '';
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                req.connection.destroy();
            }
        });

        req.on('end', function() {
            data.insertData(entity, queryData); 
            res.json(data.getData(req.params.entity));
        });

    });
    return app.myRouter;
};
