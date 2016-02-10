// const test = require('./common'),
// 			expect = require('chai').expect,
// 			_ = require('lodash');

// describe('message DAO', () => {

// 	/* drop the messages table and recreate it so each
// 	 * test is run in a controlled environment */
// 	beforeEach(done => {
// 		test.message
// 			.dropTable()
// 			.then(() => test.message.createTable())
// 			.tap(done);
// 	})

// 	it('#dropTable: should remove the table', done => {
// 		test
// 			.tableExists(test.message.tableName, true) // expect table to exist
// 			.then(test.message.dropTable()) // drop the table
// 			.then(test.tableExists(test.message.tableName, false)) // expect table to not exist
// 			.tap(done)
// 	})

// 	it('#createTable: should create the table', done => {
// 		test.message
// 			.dropTable() // drop table
// 			.then(test.tableExists(test.message.tableName, false)) // expect table to not exist
// 			.then(test.message.createTable()) // create table
// 			.then(test.tableExists(test.message.tableName, true)) // expect table to exist
// 			.tap(done);
// 	})

// 	it('#clearMessages: should remove all records', done => {
// 		test.message
// 			.addMessage(test.message.generateMessage(1, 'test message', 'eli parkinsons'))
// 			.then(() => {
// 				message.getMessages().then((results) => expect(results.length).to.equal(1));
// 			}).then(() => message.clearMessages())
// 			.then(() => {
// 				message.getMessages().then((results) => expect(results.length).to.equal(0)).then(() => done());
// 			})
// 	})

// 	it('#addMessage/getMessages: should be able to retrieve added message', done => {
// 		testMessage = message.generateMessage(1, 'test message', 'eli park');
// 		message
// 			.addMessage(testMessage)
// 			.then(() => {
// 				message.getMessages().then((results) => {
// 					expect(results.length).to.equal(1);
// 					compareProperty = (propertyName) => { return testMessage[propertyName] === results[0][propertyName]; }
// 					['message_id', 'message', 'from_username', 'date_received'].map(e => compareProperty(e)).forEach(e => expect(e).to.equal(true));
// 					done();
// 				})
// 			})
// 	})

// })