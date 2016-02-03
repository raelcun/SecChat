const sqlite = require('sqlite3')
			moment = require('moment'),
			utils = require('../lib/utils'),
			assert = require('assert'),
			Promise = require('bluebird');

module.exports = (db, tableName) => {
	var tableName = tableName || 'messages';

	return {
		tableName: tableName,

		dropTable: () => {
			return db.runAsync(`DROP TABLE IF EXISTS ${tableName}`);
		},

		createTable: () => {
			return db.runAsync(`CREATE TABLE IF NOT EXISTS ${tableName} (
			    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
			    "message_id" INTEGER,
			    "message" TEXT,
			    "from_username" INTEGER,
			    "date_received" INTEGER
				)`
			);
		},

		clearMessages: () => {
			return db.runAsync(`DELETE FROM ${tableName}`);
		},

		addMessage: (message) => {
			return db.runAsync(
				`INSERT INTO main.${tableName} (message_id, message, from_username, date_received) VALUES (?, ?, ?, ?)`,
				message.message_id, message.message, message.from_username, message.date_received);
		},

		getMessages: (startingId) => {
			startingId = startingId || 0;
			return db.allAsync(`SELECT * FROM ${tableName} WHERE id > ?`, startingId);
		},

		generateMessage: (message_id, message, from_username, date_received) => {
			date_received = date_received || moment().utc().valueOf();

			assert(utils.isInteger(message_id), 'message id must be an integer');
			assert(typeof message === 'string', 'message must be a string');
			assert(typeof from_username === 'string', 'from username must be a string');
			assert(utils.isInteger(date_received), 'message reception date is not a valid unix timestamp');

			return {
				id: undefined,
				message_id: message_id,
				message: message,
				from_username: from_username,
				date_received: date_received
			}
		},

		closeDB: closeDB = () => {
			return db.closeAsync();
		}
	}
}