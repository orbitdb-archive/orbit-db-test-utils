module.exports = {
  timeout: 30000,
  identityKeyFixtures: './test/fixtures/keys/identity-keys',
  signingKeyFixtures: './test/fixtures/keys/signing-keys',
  defaultIpfsConfig: {
    preload: {
      enabled: false
    },
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
