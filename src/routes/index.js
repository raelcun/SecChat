const fs = require('fs'),
			path = require('path');

module.exports = (server) => {
	fs.readdir(__dirname, (err, files) => {
		files.forEach(e => {
			const ext = path.extname(e).toLowerCase();
			const basename = path.basename(e, ext).toLowerCase();
			if (ext !== '.js') return;
			if (basename === 'index') return;
			require(`./${basename}`).forEach((route) => server.route(route));
		})
	})
}