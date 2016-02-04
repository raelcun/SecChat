const sqlite = require('sqlite3'),
			config = require('../../config');
require('bluebird').promisifyAll(sqlite);

const db = new sqlite.Database(config.dbPath),
			message = require('./message')(db);

module.exports = {
	db: db,

	init: () => {
		return message.createTable()
	},

	closeDB: closeDB = () => {
		return db.closeAsync();
	}
}