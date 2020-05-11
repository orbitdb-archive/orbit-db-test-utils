module.exports = {
  defaults: {
    type: 'proc',
    test: true,
    disposable: true,
    ipfsModule: require('ipfs'),
    init: false,
    start: false,
    ipfsOptions: {
      config: {
        Addresses: {
          API: '/ip4/127.0.0.1/tcp/0',
          Swarm: ['/ip4/0.0.0.0/tcp/0'],
          Gateway: '/ip4/0.0.0.0/tcp/0'
        },
        Bootstrap: []
      }
    }
  },
  overrides: {
    go: {
      test: false,
      ipfsHttpModule: require('ipfs-http-client'),
      ipfsBin: require('go-ipfs-dep').path()
    }
  }
}
