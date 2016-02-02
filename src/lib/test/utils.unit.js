const expect = require('chai').expect,
			utils = require('../utils'),
			_ = require('lodash');

describe('utils', () => {

	describe('#random', () => {

		it('should return a number between min and max inclusive', () => {
			const min = 50, max = 500;
			_.range(1000).forEach(() => {
				const r = utils.random(min, max);
				expect(r).to.be.at.least(min);
				expect(r).to.be.at.most(max);
			})
		})

	})

})