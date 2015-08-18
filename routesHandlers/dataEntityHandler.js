module.exports = function(app) {
    var data = app.data;

    app.myRouter.get('/:entity', function(req, res, next) {
        var entity = req.params.entity;
        data.getData(entity, function (err, entity_data) {
            if (err) {
                app.eventEmitter.emit('error', {response:res, message: 'entity ' + entity + ' is undefined'});
                return;
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

        if (Object.getOwnPropertyNames(new_entity).length === 0) {
            app.eventEmitter.emit('error', {response:res, message: 'cannot not insert empty data'});
        }
        data.insertData(entity, new_entity, function (err, result) {
            if (err) {
                app.eventEmitter.emit('error', {response:res});
                return;
            }
            data.getData(req.params.entity, function (err, entity_data) {
                if (err) {
                    app.eventEmitter.emit('error', {response:res});
                    return;
                }
                res.json(entity_data); 
            });
        }); 
    });
    return app.myRouter;
};
