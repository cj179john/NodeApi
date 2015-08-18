module.exports = function(app) {
    var data = app.data;

    app.myRouter.get('/:entity', function(req, res, next) {
        var entity = req.params.entity;
        data.getData(entity, function (err, entity_data) {
            if (err) {
                app.eventEmitter.emit('error', {response:res, message: err});
                next(err);
            }
            res.json(entity_data);
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
        var entity_is_empty = Object.getOwnPropertyNames(new_entity).length === 0;
        
        if (entity_is_empty) {
            app.eventEmitter.emit('error', {response:res, message: 'cannot not insert empty data'});
        }
        if (!entity_is_empty) {

            data.insertData(entity, new_entity, function (err, result, next) {
                if (err) {
                    app.eventEmitter.emit('error', {response:res, message: err});
                    next(err);
                }
                res.json(result);
            }); 
        }
    });
    return app.myRouter;
};
