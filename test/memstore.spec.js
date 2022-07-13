import { strict as assert } from "node:assert"
import { MemStore } from '../index.js'

describe('MemStore', function () {
  it('puts and gets values', async () => {
    const memStore = new MemStore()

    const value1 = 'abc123'
    const value2 = {
      heads: ['QmZcxMx76VaDyFi4hCvJ9Cg8odLJM5PQeg4bgVzCyN6xbr'],
      nexts: ['']
    }
    const cid1 = await memStore.put(value1)
    const cid2 = await memStore.put(value2)

    assert.deepStrictEqual(await memStore.get(cid1), { value: value1 })
    assert.deepStrictEqual(await memStore.get(cid2), { value: value2 })
  })
})
