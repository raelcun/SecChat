const Joi = require('joi'),
			boomSchema = require('./common/boom'),
			_ = require('lodash');

const messageRequest = {
	message_id: Joi.number().integer().required(),
	message: Joi.string().required(),
	from_username: Joi.string().required(),
	date_received: Joi.number().integer()
}

const messageResponse = Joi.alternatives().try({
	boomSchema,
	result: Joi.array().items(_.merge({}, messageRequest, { id: Joi.number().integer().required() }))
}).required()


const addMessageRequest = messageRequest;
const addMessageResponse = Joi.alternatives().try({ // TODO: return a messageResponse object instead of success/failure
	boomSchema,
	result: Joi.boolean()
}).required()

module.exports = {
	find: {
		response: { schema: messageResponse }
	},
	create: {
		response: { schema: addMessageResponse },
		validate: { payload: addMessageRequest }
	}
}