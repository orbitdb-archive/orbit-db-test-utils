const Combinatorics = require('js-combinatorics')
const Ctl = require('ipfsd-ctl')
const factoryCfg = require('./config/factory')

const connectPeers = require('./connect-peers')

const factory = Ctl.createFactory(factoryCfg.defaults, factoryCfg.overrides)

// Which IPFS implementations do we support?
const allowedTypes = ['proc', 'js', 'go']

// Creates local, connected clusters of IPFS implementations
const swarm = async function (ipfsTypes) {
  if (!Array.isArray(ipfsTypes)) {
    return Promise.reject(new Error('localSwarm: First argument should be an array'))
  }

  ipfsTypes.forEach((t) => {
    if (allowedTypes.indexOf(t) === -1) {
      throw new Error(`${t} is not a valid ipfs type. Supported types are: ${allowedTypes.join(', ')}`)
    }
  })

  const nodes = await Promise.all(ipfsTypes.map(async (type) => {
    return factory.spawn({ type })
  }))
  if (nodes.length === 1) return factory.controllers.map((ipfsd) => ipfsd.api)

  // Connect all the nodes and wait for connecting
  const permutations = Combinatorics.combination(nodes, 2).toArray()

  await Promise.all(permutations.map(async (nodePair) => {
    if (nodePair.length === 1) return
    await connectPeers(nodePair[0].api, nodePair[1].api)
  }))

  // Return the apis
  return factory.controllers.map((ipfsd) => ipfsd.api)
}

swarm.factory = factory

module.exports = swarm
