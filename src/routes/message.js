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
	},
	{
		method: 'POST',
		path: '/messages',
		handler: messageController.addMessage,
		config: {
			response: messageValidation.create.response,
			validate: messageValidation.create.validate
		}
	},
  {
    method: 'POST',
    path: '/sendMessage',
    handler: messageController.sendMessage
  }
]
