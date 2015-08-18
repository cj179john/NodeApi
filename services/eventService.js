module.exports = function (eventEmitter) {
    
    eventEmitter.on('error', function(event) {
        event.response.status(event.status || 500);
        event.response.json(event.message || 'There is an error happened on your request');
    });
};
