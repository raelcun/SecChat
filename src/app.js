const logger = require('./lib/logger')(),
			db = require('./dao/db'),
			message = require('./dao/message')(db);

message
	//.addMessage(message.generateMessage(1, 'test message', 'eli park'))
	.getMessages(5)
	.then((results) => {
		console.log(results);
	}, (err) => {
		console.log(err);
	});

// message.addMessage(message.generateMessage(1, 'test message', 'eli park'));

//console.log(message.getAllMessages());