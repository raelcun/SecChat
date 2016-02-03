const boom = require('boom'),
			db = require('../dao/db').db,
			message = require('../dao/message')(db);

module.exports = {
	getAllMessages: (request, reply) => {
		message
			.getMessages()
			.then(results => reply({ result: results }))
			.catch(err => reply(boom.wrap(err)))
	}
}