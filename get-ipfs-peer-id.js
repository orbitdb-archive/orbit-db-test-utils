'use strict'

const getIpfsPeerId = async (ipfs) => {
  const peerId = await ipfs.id()
  return peerId.id
}

module.exports = getIpfsPeerId
