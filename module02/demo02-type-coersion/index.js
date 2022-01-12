console.assert(9999999999999999 === 10000000000000000) // true
console.assert(true + 2 === 3) // true
console.assert('21' + true === '21true') // true
console.assert('21' - true === 20) // true
console.assert('21' - - true === 22) // true
console.assert(0.1 + 0.2 === 0.30000000000000004) // true
console.assert(3 > 2 > 1 === false) // true
console.assert(3 > 2 >= 1 === true) // true
console.assert('1' == 1) // true
console.assert('1' !== 1) // true
console.assert(1 === 1) // true
console.assert(String(123) === '123')
console.assert(123 + '' === '123')

// || returns the first truthy value
console.assert('hello' || 123 === 'hello')
console.assert(null || 'hello' || 123 === 'hello')

// && returns the last value if all of them are truthy
console.assert('hello' && 123 === 123)

//----------------------------------

const item = {
  name: 'Carlos',
  age: 24,

  // This function will be called first if we try to convert this object to a string.
  // If this method does not returns a primitive value, then the "valueOf" function will be called
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },

  // This function will be called first if we try to convert this object to a number.
  // If this method does not returns a primitive value, then the "toString" function will be called
  valueOf() {
    return 7
  }
}

console.assert(String(item) === 'Name: Carlos, Age: 24')
console.assert(Number(item) === 7)

const itemCopy = { ...item, name: 'Carlitos', age: 30 }

console.assert(String(itemCopy) === 'Name: Carlitos, Age: 30')
console.assert(Number(itemCopy) === 7)


const itemUsingSymbol = {
  name: 'Carlos',
  age: 24,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  valueOf() {
    return 7
  },
  // Symbol.toPrimitive has the priority over "toString" and "valueOf" 
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: 10,
      default: 'default value'
    }

    return types[coercionType]
  }
}

console.assert(String(itemUsingSymbol) === '{"name":"Carlos","age":24}')
console.assert(Number(itemUsingSymbol) === 10)

console.assert('Ae'.concat(itemUsingSymbol) === 'Ae{"name":"Carlos","age":24}')
