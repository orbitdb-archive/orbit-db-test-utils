'use strict'

const IPFSFactory = require('ipfsd-ctl')
const DatastoreLevel = require('datastore-level')
const IPFSRepo = require('ipfs-repo')
const isNode = require('is-node')
const testAPIs = require('./test-apis')

const repoConf = {
  storageBackends: {
    blocks: DatastoreLevel
  }
}

/**
 * Start an IPFS instance
 * @param  {Object}  config  [IPFS configuration to use]
 * @return {[Promise<IPFS>]} [IPFS instance]
 */
const startIpfs = async (type, config = {}) => {
  if (!testAPIs[type]) {
    throw new Error(`Wanted API type ${JSON.stringify(type)} is unknown. Available types: ${Object.keys(testAPIs).join(', ')}`)
  }

  // Use custom storage backend for IPFS block store
  // NOTE: need to duck-type 'repoPath' instead of 'repo' as ipfsd-ctl
  // flips the two, so passing 'repo' doesn't work as it does with js-ipfs
  if (false && isNode) {
    const repo = new IPFSRepo(config.repo)
    await repo.init(repoConf)
    await repo.open()

    // Use DatastoreLevel only in Nodejs environment
    config = Object.assign({}, config, { repoPath: repo.path })
  }

  // If we're starting a process, pass command line arguments to it
  if (!config.args) {
    config.args = ['--enable-pubsub-experiment']
  }

  // Spawn an IPFS daemon (type defined in)
  try {
    const f = IPFSFactory.create(testAPIs[type])
    const ipfsd = await f.spawn(config)
    debugger;
    return ipfsd.api;
  } catch(err) {
    throw new Error(err)
  }

}

module.exports = startIpfs
