'use strict'

const defaultFilter = () => true

const connectIpfsNodes = (ipfs1, ipfs2, options = {
  filter: defaultFilter
}) => new Promise((resolve, reject) => {
  console.log('connect')
  {(async function setup () {
    try {
      const id1 = await ipfs1.id()
      const id2 = await ipfs2.id()
      const addresses1 = id1.addresses.filter(options.filter)
      const addresses2 = id2.addresses.filter(options.filter)

      const swarm = async (command) => {
        // https://github.com/ipfs/go-ipfs/issues/7734
        await ipfs1.swarm[command](addresses2[0])
        await ipfs2.swarm[command](addresses1[0])
      }

      await swarm('connect')
      // check for suspect peer streams config
      // streams property only exists on go-ipfs api
      const streams1 = (await ipfs1.swarm.peers({ verbose: true }))[0].streams
      const streams2 = (await ipfs2.swarm.peers({ verbose: true }))[0].streams
      if (streams1 && streams2 && (streams1.length < 4 || streams2.length < 4)) {
        await swarm('disconnect')

        console.log('reconnect')
        setTimeout(setup, 1000)
      } else {
        console.log('connected')
        resolve()
      }
    } catch (e) {
      console.error('orbit-db-test-utils/connectPeers has failed')
      console.error(e)
      reject(e)
    }
  })()}
})

module.exports = connectIpfsNodes
