const hapi = require('hapi'),
			boom = require('boom'),
			config = require('./config'),
			logger = require('./lib/logger')(),
			db = require('./lib/dao/db').getDB(),
			message = require('./lib/dao/message')(db),
			argv = require('yargs').argv

if (argv.port) config.port = argv.port
if (argv.username) config.username = argv.username

const server = new hapi.Server();
server.connection(config.server);

// make sure data in Boom messages is displayed
server.ext('onPreResponse', (request, reply) => {
	if (request.response.isBoom && request.response.data) {
		request.response.output.payload.data = request.response.data;
	}
	return reply.continue();
})

// gracefully disconnect from db when server is killed
gracefulDBClose = () => {
	db.closeAsync().then(() => {
		logger.warn('SQLite connection terminated due to app termination')
		process.exit(0);
	})
}
process.on('SIGINT', gracefulDBClose).on('SIGTERM', gracefulDBClose);

server.register([], (err) => {
	require('./routes')(server);

	require('./lib/node').then(node => {
		node.setViewer(msg => {
			console.log(msg)
			message.addMessage(msg)
			// if (command.strCommand === 'MESSAGE') {
			// 	// TODO: message things
			// }
		})
		
		server.start(() => logger.info(`web interface started at http://${config.server.host}:${config.server.port}`))
	})
})

module.exports = server;




// message
// 	//.addMessage(message.generateMessage(1, 'test message', 'eli park'))
// 	.getMessages(5)
// 	.then((results) => {
// 		console.log(results);
// 	}, (err) => {
// 		console.log(err);
// 	});

// // message.addMessage(message.generateMessage(1, 'test message', 'eli park'));

// //console.log(message.getAllMessages());