const //kad = require('kad'),
			logger = require('./lib/logger')(),
			_ = require('lodash'),
			crypto = require('./lib/crypto');

const keys = crypto.generateKeyPair();

const encrypted = crypto.encrypt('super secret data', keys.public);
const decrypted = crypto.decrypt(encrypted, keys.private);
logger.info(decrypted);