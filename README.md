# OrbitDB Test Utils _(orbit-db-test-utils)_
> Shared test utilities for OrbitDB-related projects

[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/orbitdb/Lobby)
[![Matrix](https://img.shields.io/badge/matrix-%23orbitdb_Lobby%3Agitter.im-blue.svg)](https://app.element.io/#/room/#orbitdb_Lobby:gitter.im)
[![CircleCI](https://circleci.com/gh/orbitdb/orbit-db-test-utils/tree/main.svg?style=svg)](https://circleci.com/gh/orbitdb/orbit-db-test-utils/tree/main)


This repository contains utilities to spin up IPFS nodes and swarms, as well
as different `abstract-leveldown` implementations to use with `orbit-db-keystore`
and `orbit-db-cache`.

For examples on how this would be used, see the `test` folder in this repo, or
read on!

## Install

```bash
$ npm install -D orbit-db-test-utils
```

## Usage

### Spawn a single IPFS instance

```JavaScript
const {
  connectPeers,
  startIpfs,
  stopIpfs,
  getIpfsPeerId,
  waitForPeers
} = require('../')

;(async () => {
  // Create JS and Go nodes
  const ipfsd1 = await startIpfs('js-ipfs')
  const ipfsd2 = await startIpfs('go-ipfs')

  // Get the peer IDs
  const id1 = await getIpfsPeerId(ipfsd1.api)
  const id2 = await getIpfsPeerId(ipfsd2.api)

  // Helper function to connect the nodes
  await connectPeers(ipfsd1.api, ipfsd2.api)

  // Test that the nodes are pubsubbing with each other
  const topic = 'test-topic'
  await ipfsd1.api.pubsub.subscribe(topic, () => {})
  await ipfsd2.api.pubsub.subscribe(topic, () => {})
  await waitForPeers(ipfsd1.api, [id2], topic)

  // stop the nodes
  await stopIpfs(ipfsd1)
  await stopIpfs(ipfsd2)
})()
```

**Note:** You may run into issues with `stopIpfs` hanging the script due to a `js-ipfs` bug

## Contributing

Issues and PRs are welcome.

## License

[MIT](./LICENSE) © OrbitDB Community
