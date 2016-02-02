const kad = require('kad'),
			logger = require('./lib/logger')(),
			_ = require('lodash'),
			crypto = require('./lib/crypto'),
			utils = require('./lib/utils');

const kp = crypto.generateKeyPair();
const encrypted = kp.encrypt('super secret data');
const decrypted = kp.decrypt(encrypted);
logger.info(encrypted);
logger.info(decrypted);

// const debugKad = true;

// const keys = crypto.generateKeyPair();
// const encrypted = crypto.encrypt('super secret data', keys.public);
// const decrypted = crypto.decrypt(encrypted, keys.private);
// logger.info(decrypted);

// nodeOpts = []
// numNodes = 2;
// _.range(numNodes).forEach(n => {
// 	nodeOpts.push({
// 		transport: kad.transports.TCP(kad.contacts.AddressPortContact({
// 			address: '127.0.0.1',
// 			port: 3100 + n
// 		})),
// 		storage: kad.storage.MemStore(),
// 		logger: kad.Logger(debugKad ? 4 : 2, 'Node ' + n)
// 	})
// })

// nodes = nodeOpts.map(options => kad.Node(options));
// mainNode = nodes[0]._self;

// joinNodesP = _.slice(nodes, 1).map((node, i) => {
// 	return new Promise((resolve, reject) => {
// 		return node.connect(mainNode, err => err ? reject(err) : resolve() )
// 	})
// })

// Promise
// 	.all(joinNodesP)
// 	.then(results => {
// 		logger.info('all nodes are connected');

// 		const key = 'myKey';
// 		const value = 'myValue';

// 		// putIndex = utils.random(1, numNodes);
// 		// do {
// 		// 	getIndex = utils.random(1, numNodes);
// 		// } while (getIndex === putIndex);
// 		// logger.info(putIndex);
// 		// logger.info(getIndex);

// 		// nodes[putIndex].put(key, value, () => {
// 		// 	logger.info(`put ${key}=${value}`);
// 		// 	nodes[getIndex].get(key, (err, value) => {
// 		// 		logger.info(`got ${key}=${value}`);
// 		// 	})
// 		// });
// 	})