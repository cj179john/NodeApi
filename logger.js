const bunyan = require('bunyan');

const LOG_PATH = './logs';

function reqSerializer(req) {
	return {
		method: req.method,
		url: req.url,
		headers: req.headers,
	};
}

module.exports = bunyan.createLogger({
	name: 'APILog',
	serializers: {
		req: reqSerializer,
	},
	streams: [
		{
			path: `${LOG_PATH}/api.log`,
			level: 'info',
		},
		{
			path: `${LOG_PATH}/debug.log`,
			level: 'debug',
		},
	],
});
