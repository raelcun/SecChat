const Node = require('ded-network').node,
			config = require('../config')

const singleton = Node({ username: config.node.username, ip: config.node.ip, port: config.node.port, publicKey: config.node.publicKey, privateKey: config.node.privateKey })

module.exports = singleton
