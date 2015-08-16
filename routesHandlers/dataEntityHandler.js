module.exports = function(app) {
    var data = app.data;

    app.myRouter.get('/:entity', function(req, res, next) {
        var entity = req.params.entity;
        data.getData(entity, function (err, entity_data) {
            var result = (err)? err : entity_data; 
            res.json(result);
        });
    });
    app.myRouter.put('/:entity', function(req, res, next) {
        res.json('update');
    });
    app.myRouter.delete('/:entity', function(req, res, next) {
        res.json('delete');
    });
    app.myRouter.post('/:entity', function(req, res, next) {
        var entity = req.params.entity;
        var new_entity = req.body;
        if (Object.getOwnPropertyNames(new_entity).length === 0) {
            res.json('cannot not insert empty data');
        }
        data.insertData(entity, new_entity, function (err, result) {
            if (err) {
                res.json(err);
                return;
            }
            data.getData(req.params.entity, function (err, entity_data) {
                res.json((err)? err : entity_data); 
            });
        }); 
    });
    return app.myRouter;
};
