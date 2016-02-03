const messageController = require('../controllers/message'),
			messageValidation = require('../validate/message');

module.exports = [
	{
		method: 'GET',
		path: '/messages',
		handler: messageController.getAllMessages,
		config: {
			response: messageValidation.find.response
		}
	}
]