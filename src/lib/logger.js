const colors = require('colors/safe');

const levelTypes = {
	debug: {
		level: 1,
		color: colors.magenta
	},
	info: {
		level: 2,
		color: colors.blue
	},
	warn: {
		level: 3,
		color: colors.yellow
	},
	error: {
		level: 4,
		color: colors.red
	}
}

module.exports = (minLevel) => {
	minLevel = minLevel || 1;

	const logger = {};

	Object.keys(levelTypes).forEach(type => {
		logger[type] = (message) => {
			if (levelTypes[type].level >= minLevel) {
				console.log(levelTypes[type].color(`${type}: ${message}`))
			}
		}
	})

	return logger;
}