const ursa = require('ursa'),
			_ = require('lodash');

const encrypt = _.curry((publicKey, data) => {
	return ursa.createPublicKey(publicKey, 'base64').encrypt(data, 'utf8', 'base64');
})

const decrypt = _.curry((privateKey, data) => {
	return ursa.createPrivateKey(privateKey, '', 'base64').decrypt(data, 'base64', 'utf8');
})

const generateKeyPair = () => {
	const key = ursa.generatePrivateKey(2048);
	const privateKey = key.toPrivatePem('base64');
	const publicKey = key.toPublicPem('base64');

	return {
		public: publicKey,
		private: privateKey,
		encrypt: encrypt(publicKey),
		decrypt: decrypt(privateKey)
	}
}

module.exports = {
	generateKeyPair: generateKeyPair
}