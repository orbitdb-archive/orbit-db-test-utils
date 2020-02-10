const { swarm } = require('../')

const assert = require('assert')

describe('swarm workflow', function () {
  this.timeout(10000)

  it('throws an error if swarm is called without an array', (done) => {
    swarm('foo').catch((e) => {
      assert.strictEqual(e.message, 'localSwarm: First argument should be an array')
      done()
    })
  })

  it('throws an error if localSwarm is called with an invalid IPFS type', (done) => {
    swarm(['French']).catch((e) => {
      assert.strictEqual(e.message, 'French is not a valid ipfs type. Supported types are: proc, js, go')
      done()
    })
  })

  // Test a random selection of 2 through 10 nodes
  // FIXME: Sometimes there are intermittent MAC address and/or dial failures
  const availableTypes = ['proc', 'go']
  ;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((length) => {
    const randomType = () => availableTypes[(Math.floor(Math.random() * 2))]
    const nodeTypes = Array.from({ length }, () => randomType())

    it(`localSwarm (${length}): ${nodeTypes.join(', ')}`, async () => {
      const nodes = await swarm(nodeTypes)
      assert.strictEqual(nodes.length, length)

      for (const node of nodes) {
        const uniqueIds = new Set((await node.swarm.peers()).map(peer => {
          return peer.peer.id ? peer.peer._idB58String : peer.peer
        }))
        assert(uniqueIds.size >= (length - 1))
      }
    })
  })

  afterEach(async () => {
    await swarm.factory.clean()
    assert.strictEqual(swarm.factory.controllers.length, 0)
  })
})
