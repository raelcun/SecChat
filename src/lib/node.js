const Node = require('ded-network').node,
			config = require('../config')

const singleton = Node({ username: config.node.username, ip: config.node.ip, port: config.node.port })

module.exports = singleton