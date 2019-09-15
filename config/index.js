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
			// Firebase authentication settings
			firebase: {
				cert: JSON.parse(process.env.ADMIN_FIREBASE)
			},
			// Server settings
			server: {
				port: process.env.PORT || 8080,
			}
		};
	}
})();