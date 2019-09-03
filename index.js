exports.config = require('./config')
exports.testAPIs = require('./test-apis')
exports.startIpfs = require('./start-ipfs')
exports.stopIpfs = require('./stop-ipfs')
exports.waitForPeers = require('./wait-for-peers')
exports.connectPeers = require('./connect-peers')
exports.getIpfsPeerId = require('./get-ipfs-peer-id')
exports.MemStore = require('./mem-store')

const implementations = require('./implementations')

const properLevelModule = implementations.filter(i => i.key.indexOf('level') > -1).map(i => i.module)[0]
const defaultStorage = require('orbit-db-storage-adapter')(properLevelModule)

exports.implementations = implementations
exports.defaultStorage = defaultStorage
