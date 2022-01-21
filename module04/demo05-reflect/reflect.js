const assert = require('assert')

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// A problem that might happen
myObj.add.apply = function() { throw new TypeError('overriding the function') }

assert.throws(() => myObj.add.apply({}, []), {
  name: 'TypeError',
  message: 'overriding the function'
})

// using Reflect
const result = Reflect.apply(myObj.add, { arg1: 10, arg2: 20 }, [100])
assert.deepStrictEqual(result, 130)


function MyDate() {}

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

Reflect.defineProperty(MyDate, 'withReflect', { value: () => 'Hey there' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflect(), 'Hey there')



const withDelete = {
  user: 'Carlos'
}
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)


const withReflect = {
  user: 'Carlos'
}
Reflect.deleteProperty(withReflect, 'user')

assert.deepStrictEqual(withReflect.hasOwnProperty('user'), false)


assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))


const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: '123',
  [user]: 'carlos'
}

const objcetKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

assert.deepStrictEqual(objcetKeys, ['id', Symbol.for('password'), user])

assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])