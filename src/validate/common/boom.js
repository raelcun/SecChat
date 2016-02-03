const Joi = require('joi');

module.exports = {
	message: Joi.string().required(),
	statusCode: Joi.number().integer().greater(400),
	error: Joi.string().required(),
	attributes: Joi.object()
}