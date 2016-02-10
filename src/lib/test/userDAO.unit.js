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

	describe('#dropTable', done => {
		it('should remove the table', done => {
			test
				.tableExists(test.user.tableName, true)
				.then(() => test.user.dropTable())
				.then(() => test.tableExists(test.user.tableName, false))
				.then(() => done())
		})
	})

	describe('#createTable', done => {
		it('should create the table', done => {
			test.user
				.dropTable()
				.then(() => test.tableExists(test.user.tableName, false))
				.then(() => test.user.createTable())
				.then(() => test.tableExists(test.user.tableName, true))
				.then(() => done())
		})
	})

	describe('#clearUsers', done => {
		it('should remove all users', done => {
			test.user
				.addUser(test.user.generateUser('eli parkinsons', 'mr_parkinsons_public_key'))
				.then(() => test.user.getAllUsers())
				.then(results => expect(results.length).to.equal(1))
				.then(() => test.user.clearUsers())
				.then(() => test.user.getAllUsers())
				.then(results => expect(results.length).to.equal(0))
				.then(() => done())
		})
	})

	describe('#addUser/getAllUsers', () => {
		it('should be able to retrieve added users', done => {
			testUser = test.user.generateUser('test message', 'elijah parkinsons');
			test.user
				.addUser(testUser)
				.then(() => test.user.getAllUsers())
				.then(results => {
					expect(results.length).to.equal(1);
					['username', 'public_key'].map(e => test.compareProperty(results[0], testUser, e)).forEach(e => expect(e).to.equal(true));
					done();
				})
		})
	})

})
