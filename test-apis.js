/**
 * IPFS daemons to run the tests with.
 */

// Available daemon types are defined in:
// https://github.com/ipfs/js-ipfsd-ctl#ipfsfactory---const-f--ipfsfactorycreateoptions
let jsIpfs = {
  'js-ipfs': {
    type: 'proc',
    test: true,
    disposable: true,
    ipfsModule: require('ipfs')
  }
}

const goIpfs = {
  'go-ipfs': {
    type: 'go',
    test: true,
    disposable: true,
    args: ['--enable-pubsub-experiment'],
    ipfsHttpModule: require('ipfs-http-client'),
    ipfsBin: require('go-ipfs').path()
  }
}

// By default, we run tests against js-ipfs.
let testAPIs = Object.assign({}, jsIpfs)

// Setting env variable 'TEST=all' will make tests run with js-ipfs and go-ipfs.
// Setting env variable 'TEST=go' will make tests run with go-ipfs.
// Eg. 'TEST=go mocha' runs tests with go-ipfs
if (process.env.TEST === 'all') {
  testAPIs = Object.assign({}, testAPIs, goIpfs)
} else if (process.env.TEST === 'go') {
  testAPIs = Object.assign({}, goIpfs)
}

module.exports = testAPIs
