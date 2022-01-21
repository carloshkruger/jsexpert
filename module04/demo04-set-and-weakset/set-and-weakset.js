const assert = require('assert')

// Set
// It is not iterable

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.forEach(item => set.add(item))
arr2.forEach(item => set.add(item))

assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

assert.ok(set.has('3'))

// Return what has in both lists (intersection)
const users01 = new Set([
  'carlos',
  'erick',
  'joao'
])

const users02 = new Set([
  'pedro',
  'maria',
  'carlos'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['carlos'])

const difference = new Set([...users01].filter(user => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['erick', 'joao'])

// WeakSet
// It is not iterable

const user = { id: 123 }
const user2 = { id: 124 }

const weakSet = new WeakSet([ user ])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)