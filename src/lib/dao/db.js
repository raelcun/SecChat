const sqlite = require('sqlite3'),
			config = require('../../config');
require('bluebird').promisifyAll(sqlite);

module.exports = {
	getDB: (initialize) => {
		var db = new sqlite.Database(config.dbPath);

		if (initialize === true) {
			const message = require('./message')(db);
			const user = require('./user')(db);
			message.createTable();
			user.createTable();
		}

		return db
	}
}