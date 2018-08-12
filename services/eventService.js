module.exports = function eventService(eventEmitter) {
	eventEmitter.on('error', (event) => {
		event.response.status(event.status || 500);
		event.response.json(event.message || 'There is an error happened on your request');
		return false;
	});
};
