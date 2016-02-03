const Joi = require('joi'),
			boomSchema = require('./common/boom');

const messageResponse = Joi.alternatives().try({
	boomSchema,
	result: Joi.array().items({
		id: Joi.number().integer().required(),
		message_id: Joi.number().integer().required(),
		message: Joi.string().required(),
		from_username: Joi.string().required(),
		date_received: Joi.number().integer().required()
	})
}).required()

module.exports = {
	find: {
		response: { schema: messageResponse }
	}
}