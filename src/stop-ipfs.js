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

  setTimeout(async () => {
    await ipfsd.stop()
  }, 0)
}

export default stopIpfs
