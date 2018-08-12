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
			path: `${LOG_PATH}/info.log`,
			level: 'info',
		},
	],
});
