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
			firebase: {
				cert: {
					project_id: process.env.FIREBASE_PROJECT_ID,
					client_email: process.env.FIREBASE_CLIENT_EMAIL,
					private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
				}
			},
			// Server settings
			server: {
				port: process.env.PORT || 8080,
			}
		};
	}
})();