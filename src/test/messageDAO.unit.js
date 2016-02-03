const expect = require('chai').expect,
			_ = require('lodash'),
			db = require('../dao/db'),
			message = require('../dao/message')(db.db, 'testMessages'),
			Promise = require('bluebird');

const tableExists = (tableName) => {
	return new Promise((resolve, reject) => {
		db.db
			.allAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?`, message.tableName)
			.then((results) => resolve(results.length > 0))
			.catch((err) => reject(err))
	})
}

describe('message DAO', () => {

	beforeEach((done) => {
		message
			.dropTable()
			.then(() => message.createTable())
			.then(() => done());
	})

	after((done) => {
		db.closeDB().then(() => done());
	})

	describe('#dropTable', () => {
		it('should remove the table', (done) => {
			tableExists(message.tableName)
				.then((result) => expect(result).to.equal(true))
				.then(() => message.dropTable())
				.then(() => {
					tableExists(message.tableName).then((result) => {
						expect(result).to.equal(false);
						done();
					})
				})
		})
	})

	describe('#createTable', () => {
		it('should create the table', (done) => {
			message
				.dropTable()
				.then(() => {
					tableExists(message.tableName).then((result) => expect(result).to.equal(false))
				})
				.then(() => message.createTable())
				.then(() => {
					tableExists(message.tableName).then((result) => {
						expect(result).to.equal(true);
						done();
					})
				})
		})
	})

	describe('#clearMessages', () => {
		it('should remove all records', (done) => {
			message
				.addMessage(message.generateMessage(1, 'test message', 'eli park'))
				.then(() => {
					message.getMessages().then((results) => expect(results.length).to.equal(1));
				}).then(() => message.clearMessages())
				.then(() => {
					message.getMessages().then((results) => expect(results.length).to.equal(0)).then(() => done());
				})
		})
	})

	describe('#addMessage/getMessages', () => {
		it('should be able to retrieve added message', (done) => {
			testMessage = message.generateMessage(1, 'test message', 'eli park');
			message
				.addMessage(testMessage)
				.then(() => {
					message.getMessages().then((results) => {
						expect(results.length).to.equal(1);
						compareProperty = (propertyName) => { return testMessage[propertyName] === results[0][propertyName]; }
						['message_id', 'message', 'from_username', 'date_received'].map((e) => compareProperty(e)).forEach((e) => expect(e).to.equal(true));
						done();
					})
				})
		})
	})

})