exports.MemStore = require('./mem-store')
exports.swarm = require('./swarm')
exports.config = require('./config')
exports.connectPeers = require('./connect-peers')
exports.getIpfsPeerId = require('./get-ipfs-peer-id')
exports.startIpfs = require('./start-ipfs')
exports.stopIpfs = require('./stop-ipfs')
exports.testAPIs = require('./test-apis.js')
exports.waitForPeers = require('./wait-for-peers')

// Different abstract-leveldown implementations
// const implementations = require('./implementations')
// const properLevelModule = implementations
//   .filter(i => i.key.indexOf('level') > -1)
//   .map(i => i.module)[0]
// const defaultStorage = require('orbit-db-storage-adapter')(properLevelModule)
// exports.defaultStorage = defaultStorage
// exports.implementations = implementations
