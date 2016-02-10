const test = require('./common'),
			expect = require('chai').expect,
			_ = require('lodash');

describe('user DAO', () => {

	/* drop the users table and recreate it so each
	 * test is run in a controlled environment */
	beforeEach(done => {
		test.user
			.dropTable()
			.then(() => test.user.createTable())
			.then(() => done());
	})

	describe('#dropTable', () => {
		it('should remove the table', done => {
				test
					.tableExists(test.user.tableName, true)
					.then(() => test.user.dropTable())
					.then(() => test.tableExists(test.user.tableName, false))
					.then(() => done())

				/* WORKS!!!! */
				// p = p.then(() => {
				// 	return new Promise((resolve, reject) => {
				// 		test.db
				// 			.runAsync(`CREATE TABLE IF NOT EXISTS ${test.user.tableName} (
				// 		    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
				// 		    "username" TEXT,
				// 		    "public_key" TEXT,
				// 		    "first_contact" INTEGER,
				// 		    "last_contact" INTEGER
				// 			)`)
				// 			.then(() => test.db.allAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?`, test.user.tableName))
				// 			.then(results => {
				// 				console.log('1', results);
				// 				expect(results.length > 0).to.equal(true)
				// 			})
				// 			.then(() => test.db.runAsync(`DROP TABLE IF EXISTS ${test.user.tableName}`))
				// 			.then(() => test.db.allAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?`, test.user.tableName))
				// 			.then(results => {
				// 				console.log('2', results);
				// 				expect(results.length > 0).to.equal(false)
				// 				resolve();
				// 			})
				// 		})
				// })

				// p = p
				// 	.then(test.user.createTable())
				// 	.then(test.tableExists(test.user.tableName, true))
				// 	.then(test.user.dropTable())
				// 	.then(test.tableExists(test.user.tableName, false))

			// test.db.beginTransaction((err, trans) => {
			// 	test.user
			// 		.dropTable(trans)
			// 		.then(test.user.createTable(trans))
			// 		.then(test.tableExists(test.user.tableName, true, trans))
			// 		.then(test.user.dropTable())
			// 		.then(test.tableExists(test.user.tableName, false, trans))
			// 		.then(() => done())
			// })

			// test.db
			// 	.runAsync(`CREATE TABLE IF NOT EXISTS ${test.user.tableName} (
			//     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
			//     "username" TEXT,
			//     "public_key" TEXT,
			//     "first_contact" INTEGER,
			//     "last_contact" INTEGER
			// 	)`)
			// 	.return(test.db.allAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?`, test.user.tableName))
			// 	.then(results => expect(results.length > 0).to.equal(true))
			// 	.then(test.db.runAsync(`DROP TABLE IF EXISTS ${test.user.tableName}`))
			// 	.return(test.db.allAsync(`SELECT name FROM sqlite_master WHERE type="table" AND name=?`, test.user.tableName))
			// 	.then(results => {
			// 		console.log(results);
			// 		expect(results.length > 0).to.equal(false)
			// 	})
			// 	.then(() => done())

			// test
			// 	.tableExists(test.user.tableName, true) // expect table to exist
			// 	.then(test.user.dropTable()) // drop the table
			// 	.then(test.tableExists(test.user.tableName, false)) // expect table to not exist
			// 	.then(() => done())
		})
	})

	// describe('#createTable', () => {
	// 	it('should create the table', done => {
	// 		test.user
	// 			.dropTable() // drop table
	// 			.then(test.tableExists(test.user.tableName, false)) // expect table to not exist
	// 			.then(test.user.createTable()) // create table
	// 			.then(test.tableExists(test.user.tableName, true)) // expect table to exist
	// 			.then(() => done())
	// 	})
	// })

	// describe('#clearMessages', () => {
	// 	it('should remove all records', done => {
	// 		message
	// 			.addMessage(message.generateMessage(1, 'test message', 'eli park'))
	// 			.then(() => {
	// 				message.getMessages().then((results) => expect(results.length).to.equal(1));
	// 			}).then(() => message.clearMessages())
	// 			.then(() => {
	// 				message.getMessages().then((results) => expect(results.length).to.equal(0)).then(() => done());
	// 			})
	// 	})
	// })

	// describe('#addMessage/getMessages', () => {
	// 	it('should be able to retrieve added message', done => {
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

})
