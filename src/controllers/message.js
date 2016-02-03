const boom = require('boom'),
			db = require('../dao/db').db,
			message = require('../dao/message')(db);

module.exports = {
	getAllMessages: (request, reply) => {
		message
			.getMessages()
			.then(results => reply({ result: results }))
			.catch(err => reply(boom.wrap(err)))
	},

	addMessage: (request, reply) => {
		message
			.addMessage(message.generateMessage(request.payload.message_id, request.payload.message, request.payload.from_username, request.payload.date_received))
			.then(() => reply({ result: true }))
			.catch(err => reply(boom.wrap(err)))
	}
}