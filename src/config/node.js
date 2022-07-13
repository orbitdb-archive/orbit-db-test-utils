export default {
  timeout: 30000,
  identityKeyFixtures: './test/fixtures/keys/identity-keys',
  signingKeyFixtures: './test/fixtures/keys/signing-keys',
  identityKeysPath: './orbitdb/identity/identitykeys',
  signingKeysPath: './orbitdb/identity/signingkeys',
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
        Swarm: ['/ip4/0.0.0.0/tcp/0'],
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
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        API: '/ip4/127.0.0.1/tcp/0',
        Swarm: ['/ip4/0.0.0.0/tcp/0'],
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
  daemon2: {
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        API: '/ip4/127.0.0.1/tcp/0',
        Swarm: ['/ip4/0.0.0.0/tcp/0'],
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
  }
}
