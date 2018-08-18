const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

const configs = {
	test: {
		database: {
			url: '127.0.0.1',
			port: '27017',
		},
		port: 3999,
	},
	dev: {
		database: {
			url: '127.0.0.1',
			port: '27017',
			name: 'jwt-test',
		},
		port: 3009,
	},
};

module.exports = configs[env];
