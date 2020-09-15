module.exports = {
  timeout: 30000,
  identityKeyFixtures: './test/fixtures/keys/identity-keys',
  signingKeyFixtures: './test/fixtures/keys/signing-keys',
  identityKeysPath: './orbitdb/identity/identitykeys',
  signingKeysPath: './orbitdb/identity/signingkeys',
  defaultIpfsConfig: {
    preload: {
      enabled: false
    },
    repo: './ipfs/ipfs-log/tests/daemon',
    start: true,
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        API: '/ip4/127.0.0.1/tcp/0',
        Swarm: [],
        Gateway: '/ip4/0.0.0.0/tcp/0'
      },
      Bootstrap: [],
      Discovery: {
        MDNS: {
          Enabled: true,
          Interval: 0
        },
        webRTCStar: {
          Enabled: false
        }
      }
    }
  },
  daemon1: {
    repo: './ipfs/ipfs-log/tests/daemon1',
    start: true,
    relay: { enabled: true, hop: { enabled: true, active: true } },
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        API: '/ip4/127.0.0.1/tcp/0',
        Swarm: ['/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star'],
        Gateway: '/ip4/0.0.0.0/tcp/0'
      },
      Bootstrap: [],
      Discovery: {
        MDNS: {
          Enabled: true,
          Interval: 10
        },
        webRTCStar: {
          Enabled: true
        }
      }
    }
  },
  daemon2: {
    repo: './ipfs/ipfs-log/tests/daemon2',
    start: true,
    relay: { enabled: true, hop: { enabled: true, active: true } },
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        API: '/ip4/127.0.0.1/tcp/0',
        Swarm: ['/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star'],
        Gateway: '/ip4/0.0.0.0/tcp/0'
      },
      Bootstrap: [],
      Discovery: {
        MDNS: {
          Enabled: true,
          Interval: 10
        },
        webRTCStar: {
          Enabled: true
        }
      }
    }
  }
}
