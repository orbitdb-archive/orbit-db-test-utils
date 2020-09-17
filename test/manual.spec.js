const assert = require('assert')

const {
  connectPeers,
  startIpfs,
  stopIpfs,
  testAPIs,
  getIpfsPeerId,
  waitForPeers
} = require('../')

describe('Manual Workflow', function () {
  Object.keys(testAPIs).forEach((api) => {
    describe(`Success: Start and stop ${api}`, function () {
      this.timeout(10000)

      let ipfsd1, ipfsd2

      it('starts and stops two connected nodes', async () => {
        const topic = 'test-topic'

        ipfsd1 = await startIpfs(api)
        ipfsd2 = await startIpfs(api)

        const id1 = await getIpfsPeerId(ipfsd1.api)
        const id2 = await getIpfsPeerId(ipfsd2.api)
        assert.strict.notEqual(id1, id2)

        await connectPeers(ipfsd1.api, ipfsd2.api)
        assert.strictEqual((await ipfsd1.api.swarm.peers()).length, 1)
        assert.strictEqual((await ipfsd2.api.swarm.peers()).length, 1)

        await ipfsd1.api.pubsub.subscribe(topic, () => {})
        await ipfsd2.api.pubsub.subscribe(topic, () => {})

        await waitForPeers(ipfsd1.api, [id2], topic)
      })

      afterEach(async () => {
        await stopIpfs(ipfsd1)
        await stopIpfs(ipfsd2)
      })
    })
  })

  describe('Errors', function () {
    it('startIpfs throws error if wrong api type passed', async () => {
      let ipfsd

      try {
        ipfsd = await startIpfs('xxx')
      } catch (e) {
        const expected = 'Wanted API type "xxx" is unknown. Available types: js-ipfs, go-ipfs'
        assert.strictEqual(e.message, expected)
        await stopIpfs(ipfsd)
      }
    })

    it('stopIpfs resolves if no controller is passed', async () => {
      await stopIpfs()
    })

    it('waitForPeers errors if an invalid IPFS api is passed', async () => {
      try {
        await waitForPeers('x')
      } catch (e) {
        assert(e.message, 'Cannot read property \'peers\' of undefined')
      }
    })
  })
})
