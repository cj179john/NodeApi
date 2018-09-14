module.exports = function dataEntityHandler(app) {
	const { data } = app;

	app.myRouter.get('/:id', (req, res, next) => {
		const { entity } = req.params;

		data.getData(entity, (err, entityData) => {
			if (err) {
				app.eventEmitter.emit('error', { response: res, message: err });
				return next(err);
			}
			return res.json(entityData);
		});
	});
	app.myRouter.put('/:entity', (req, res) => {
		res.json('update');
	});
	app.myRouter.delete('/:entity', (req, res) => {
		res.json('delete');
	});
	app.myRouter.post('/:entity', (req, res, next) => {
		const { entity } = req.params;
		const newEntity = req.body;
		const entityIsEmpty = Object.getOwnPropertyNames(newEntity).length === 0;

		if (entityIsEmpty) {
			app.eventEmitter.emit('error', { response: res, message: 'cannot not insert empty data' });
		}
		if (!entityIsEmpty) {
			data.insertData(entity, newEntity, (err, result) => {
				if (err) {
					app.eventEmitter.emit('error', { response: res, message: err });
					return next(err);
				}
				return res.json(result);
			});
		}
	});
	return app.myRouter;
};
