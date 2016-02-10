const test = require('./common'),
			expect = require('chai').expect,
			_ = require('lodash');

describe('message DAO', () => {

	/* drop the users table and recreate it so each
	 * test is run in a controlled environment */
	beforeEach(done => {
		test.message
			.dropTable()
			.then(() => test.message.createTable())
			.then(() => done());
	})

	describe('#dropTable', () => {
		it('should remove the table', done => {
			test
				.tableExists(test.message.tableName, true)
				.then(() => test.message.dropTable())
				.then(() => test.tableExists(test.message.tableName, false))
				.then(() => done())
		})
	})

	describe('#createTable', () => {
		it('should create the table', done => {
			test.message
				.dropTable()
				.then(() => test.tableExists(test.message.tableName, false))
				.then(() => test.message.createTable())
				.then(() => test.tableExists(test.message.tableName, true))
				.then(() => done())
		})
	})

	describe('#clearMessages', () => {
		it('should remove all messages', done => {
			test.message
				.addMessage(test.message.generateMessage(1, 'test message', 'elijah min-jun'))
				.then(() => test.message.getMessages())
				.then(results => expect(results.length).to.equal(1))
				.then(() => test.message.clearMessages())
				.then(() => test.message.getMessages())
				.then(results => expect(results.length).to.equal(0))
				.then(() => done())
		})
	})

	describe('#addMessage/getMessages', () => {
		it('#addMessage/getMessages: should be able to retrieve added message', done => {
			testMessage = test.message.generateMessage(1, 'oh, how I miss my old country', 'eli min-jun');
			test.message
				.addMessage(testMessage)
				.then(() => test.message.getMessages())
				.then(results => {
						expect(results.length).to.equal(1);
						['message_id', 'message', 'from_username', 'date_received'].map(e => test.compareProperty(results[0], testMessage, e)).forEach(e => expect(e).to.equal(true));
						done();
				})
		})
	})

})