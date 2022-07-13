'use strict'

import { sha256 } from 'multiformats/hashes/sha2'
import * as json from 'multiformats/codecs/json'
import { CID } from 'multiformats/cid'
import { base58btc } from 'multiformats/bases/base58'

const defaultBase = base58btc

const DAG_CBOR_CODE = 0x71

const cidifyString = (str) => {
  if (!str) {
    return str
  }

  if (Array.isArray(str)) {
    return str.map(cidifyString)
  }

  return CID.parse(str)
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

export default MemStore
