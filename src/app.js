const hapi = require('hapi'),
			boom = require('boom'),
			config = require('./config'),
			logger = require('./lib/logger')(),
			db = require('./dao/db'),
			message = require('./dao/message')(db);

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
	db.db.closeAsync().then(() => {
		logger.warn('SQLite connection terminated due to app termination')
		process.exit(0);
	})
}
process.on('SIGINT', gracefulDBClose).on('SIGTERM', gracefulDBClose);

db
	.init()
	.then(() => {
		server.register([], (err) => {
			require('./routes')(server);

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