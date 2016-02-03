const assert = require('assert');

module.exports = {
	random: (min, max) => { return Math.floor(Math.random()*(max-min+1)+min); },
	isInteger: (n) => { return (typeof n === 'number') && Math.floor(n) === n; }
}