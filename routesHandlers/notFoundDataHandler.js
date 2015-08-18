module.exports = function(req, res, eventEmitter) {
    eventEmitter.emit('error', {response: res, status : '500', message: 'invalid request'});
};
