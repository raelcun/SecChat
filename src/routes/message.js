const messageController = require('../controllers/message'),
			messageValidation = require('../validate/message');

module.exports = [
	{
		method: 'GET',
		path: '/messages',
		handler: messageController.getAllMessages
	},
	{
		method: 'POST',
		path: '/messages',
		handler: messageController.addMessage,
	},
  {
    method: 'POST',
    path: '/sendMessage',
    handler: messageController.sendMessage
  }
]
