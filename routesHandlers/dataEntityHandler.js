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
        var new_enttiy = req.body;
        data.insertData(entity, new_enttiy); 
        res.json(data.getData(req.params.entity));
    });
    return app.myRouter;
};
