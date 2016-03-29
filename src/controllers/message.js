const boom = require('boom'),
			db = require('../lib/dao/db').getDB(),
			message = require('../lib/dao/message')(db);

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
	},

  sendMessage: (request, reply) => {
    console.log(request.payload);

    require('../lib/node').then(node => {
      message.addMessage({ from_username: node.username, to_username: 
request.payload.message.to_username, 
message: 
request.payload.message.message, date_received: Date.now() })
			node.sendMessage(request.payload.message.to_username, 
request.payload.message.message)
			reply({ result: 'eli parkinsons' })
    })
  }
}
