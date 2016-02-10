const expect = require('chai').expect,
			db = require('../dao/db').getDB(false),
			user = require('../dao/user')(db, 'testUsers'),
			message = require('../dao/message')(db, 'testMessages')
			Promise = require('bluebird');

const internals = {}

internals.tableExists = (tableName, expectation) => {
	return db
		.allAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?`, tableName)
		.then(results => expect(results.length > 0).to.equal(expectation))
}

module.exports = {
	db: db,
	user: user,
	message: message,

	tableExists: internals.tableExists
}