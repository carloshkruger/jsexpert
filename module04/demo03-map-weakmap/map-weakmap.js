const assert = require('assert')

const myMap = new Map()

// It can use anything as key
myMap
  .set(1, 'one')
  .set('Carlos', { text: 'two' })
  .set(true, () => 'hello')

// It can be instantiated passing the values directly on constructor
const myMapWithConstructor = new Map([
  ['1', 'string'],
  [1, 'num1'],
  [true, 'bool1']
])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Carlos'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Carlos' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Carlos' })

assert.deepStrictEqual(myMap.size, 4)

assert.ok(myMap.has(onlyReferenceWorks))

assert.ok(myMap.delete(onlyReferenceWorks))

assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, 'one'], ['Carlos', { text: 'two' }], [true, () => 'hello']]))

const actor = {
  name: 'Carlos',
  toString: 'Trying to override toString method'
}

myMap.set(actor)

assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])


// WeakMap
// It has most of the Map benefits, but it can only be used reference keys like objects.
// When the Garbage Collector removes an instance in memory, that reference is removed from WeakMap as well.


const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)