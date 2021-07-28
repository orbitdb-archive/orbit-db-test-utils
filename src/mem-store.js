'use strict'

const { sha256 } = require('multiformats/hashes/sha2')
const json = require('multiformats/codecs/json')
const { CID } = require('multiformats/cid')
const { base58btc } = require('multiformats/bases/base58')
const defaultBase = base58btc

const DAG_CBOR_CODE = 0x71

const cidifyString = (str) => {
  if (!str) {
    return str
  }

  if (Array.isArray(str)) {
    return str.map(cidifyString)
  }

  return CID.asCID(str)
}

/* Memory store using an LRU cache */
class MemStore {
  constructor () {
    this._store = new Map()
  }

  async put (value) {
    const multihash = await sha256.digest(json.encode(value))
    const cid = CID.create(1, DAG_CBOR_CODE, multihash)
    const key = cid.toString(defaultBase)

    this._store.set(key, value)

    return cid
  }

  async get (cid) {
    const data = this._store.get(cid.toString(defaultBase))

    // TODO: Change this to refs
    const links = ['next', 'heads']
    links.forEach((prop) => {
      if (data[prop]) {
        data[prop] = cidifyString(data[prop])
      }
    })

    return {
      value: data
    }
  }
}

module.exports = MemStore
