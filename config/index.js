'use strict';

module.exports = (() => {
	const dotenv = require('dotenv');
    dotenv.config();
	switch (process.env.NODE_ENV) {
	case 'development':
	default:
		return {
			// MongoDB connection settings
			database: {
				uri: process.env.MONGODB_URI
			},

			auth: {
				loc: process.env.FIREBASE_LOC,
			},

			// Server settings
			server: {
				// host: 'localhost',
				port: process.env.PORT || 8080,
			}
		};
	}
})();