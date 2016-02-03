const sqlite = require('sqlite3'),
			config = require('../config');
require('bluebird').promisifyAll(sqlite);

const db = new sqlite.Database(config.dbPath);

module.exports = db