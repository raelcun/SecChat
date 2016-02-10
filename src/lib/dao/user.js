const sqlite = require('sqlite3')
			moment = require('moment'),
			utils = require('../utils'),
			assert = require('assert');

module.exports = (db, tableName) => {
	var tableName = tableName || 'users';

	return {
		tableName: tableName,

		dropTable: () => {
			return db.runAsync(`DROP TABLE IF EXISTS ${tableName}`);
		},

		createTable: () => {
			return db.runAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (
			    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
			    "username" TEXT,
			    "public_key" TEXT,
			    "first_contact" INTEGER,
			    "last_contact" INTEGER
				)`
			);
		},

		clearUsers: () => {
			return db.runAsync(`DELETE FROM ${tableName}`);
		},

		addUser: (user) => {
			return db.runAsync(
				`INSERT INTO main.${tableName} (username, public_key, first_contact, last_contact) VALUES (?, ?, ?, ?)`,
				user.username, user.public_key, user.first_contact, user.last_contact);
		},

		getUserByName: (username) => {
			assert(typeof username === 'string', 'username must be a string');
			return db.allAsync(`SELECT * FROM ${tableName} WHERE username = ? LIMIT 1`, username);
		},

		getAllUsers: () => {
			return db.allAsync(`SELECT * FROM ${tableName}`);
		},

		generateUser: (username, public_key, first_contact, last_contact) => {
			first_contact = first_contact || moment().utc().valueOf();
			last_contact = last_contact || moment().utc().valueOf();

			assert(typeof username === 'string', 'username must be a string');
			assert(typeof public_key === 'string', 'public key must be a string');
			assert(utils.isInteger(first_contact), 'user first contact date is not a valid unix timestamp');
			assert(utils.isInteger(last_contact), 'user last contact date is not a valid unix timestamp');

			return {
				id: undefined,
				username: username,
				public_key: public_key,
				first_contact: first_contact,
				last_contact: last_contact
			}
		}
	}
}
