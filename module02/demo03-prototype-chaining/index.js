const assert = require('assert')
const obj = {}
const arr = []
const fn = () => {}

// internally, literal objects become explicit functions
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

console.log('obj.__proto__ === Object.prototype?', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype?', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype?', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

console.log('arr.__proto__.__proto__.__proto__ === null', arr.__proto__.__proto__.__proto__ === null)
assert.deepStrictEqual(arr.__proto__.__proto__.__proto__, null)

console.log('fn.__proto__.__proto__.__proto__ === null', fn.__proto__.__proto__.__proto__ === null)
assert.deepStrictEqual(fn.__proto__.__proto__.__proto__, null)


function Employee() {}
Employee.prototype.salary = () => 'salary**'

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => 'profitShare**'

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// When we don't use the "new", we need to use "prototype"
console.log('Manager.prototype.salary()', Manager.prototype.salary())


console.log('Manager.prototype.__proto__ === Supervisor.prototype', Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses()) 

// When we instantiate an object with "new", the "__proto__" property contain the instance itself
assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

console.log('-------------')

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3()

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
