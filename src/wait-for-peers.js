'use strict'

const waitForPeers = (ipfs, peersToWait, topic) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const peers = await ipfs.pubsub.peers(topic)
        const hasAllPeers = peersToWait.map((e) => peers.includes(e)).filter((e) => e === false).length === 0
        console.log("::::", peers)

        // FIXME: Does not fail on timeout, not easily fixable
        if (hasAllPeers) {
          console.log('Found peers!')
          clearInterval(interval)
          resolve()
        }
      } catch (e) {
        clearInterval(interval)
        reject(e)
      }
    }, 1000)
  })
}

module.exports = waitForPeers
