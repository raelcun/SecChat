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
		})
	})

	describe('#createTable', () => {
		it('should create the table', done => {
			test.user
				.dropTable()
				.then(() => test.tableExists(test.user.tableName, false))
				.then(() => test.user.createTable())
				.then(() => test.tableExists(test.user.tableName, true))
				.then(() => done())
		})
	})

	describe('#clearAllUsers', () => {
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
			testUser = test.user.generateUser('elijah parkinsons', 'public_key');
			test.user
				.addUser(testUser)
				.then(() => test.user.getAllUsers())
				.then(results => {
					expect(results.length).to.equal(1);
					['username', 'public_key', 'first_contact', 'last_contact'].map(e => test.compareProperty(results[0], testUser, e)).forEach(e => expect(e).to.equal(true));
					done();
				})
		})
	})

	describe('#getUserByName', () => {
		it('should get correct user by name', done => {
			const user1 = test.user.generateUser('david', 'public_key_1')
			const user2 = test.user.generateUser('dan', 'public_key_2')
			const user3 = test.user.generateUser('eli', 'public_key_3')

			test.user
				.addUser(user1)
				.then(() => test.user.addUser(user2))
				.then(() => test.user.addUser(user3))
				.then(() => test.user.getUserByName(user2.username))
				.then(results => {
					expect(results.length).to.equal(1);
					['username', 'public_key', 'first_contact', 'last_contact'].map(e => test.compareProperty(results[0], user2, e)).forEach(e => expect(e).to.equal(true));
					done();
				})
		})
	})

})
