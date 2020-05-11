'use strict'

const Ctl = require('ipfsd-ctl')
const testAPIs = require('./test-apis')

/**
 * Start an IPFS instance
 * @param  {Object}  config  [IPFS configuration to use]
 * @return {[Promise<IPFS>]} [IPFS instance]
 */
const startIpfs = async (type, config = {}) => {
  if (!testAPIs[type]) {
    throw new Error(`Wanted API type ${JSON.stringify(type)} is unknown. Available types: ${Object.keys(testAPIs).join(', ')}`)
  }

  // Spawn an IPFS daemon (type defined in)
  try {
    const ipfsd = Ctl.createController(testAPIs[type])
    return ipfsd
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = startIpfs
