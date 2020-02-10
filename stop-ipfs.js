'use strict'

/**
 * Stop an IPFS or ipfsd-ctl instance
 * @param  {Object}  config  [IPFS ipfsd-ctl to stop]
 * @return {None}
 */
const stopIpfs = async (ipfsd) => {
  if (!ipfsd) {
    return Promise.resolve()
  }

  await ipfsd.stop()
}

module.exports = stopIpfs
