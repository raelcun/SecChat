const expect = require('chai').expect,
			crypto = require('../crypto');

describe('crypto', () => {

	describe('#encrypt', () => {

		it('should return a modified string', () => {
			const encrypted = crypto.generateKeyPair().encrypt('super secret data');
			expect(typeof encrypted).to.equal('string');
		});

		it('should return a string different from the input', () => {
			const data = 'super secret data';
			const encrypted = crypto.generateKeyPair().encrypt(data);
			expect(encrypted).to.not.equal(data);
		})

	})

	describe('#decrypt', () => {

		it('decrypt returns original value', () => {
			const data = 'super secret data';
			const kp = crypto.generateKeyPair();
			const encrypted = kp.encrypt(data);
			const decrypted = kp.decrypt(encrypted);
			expect(decrypted).to.equal(data);
		})

	})

})