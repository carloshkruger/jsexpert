const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

const dbData = [
  { name: 'Maria' },
  { name: 'João' }
]

class MockDatabase {
  connect = () => this
  find = async () => dbData
}

rewiremock(() => require('../src/util/database')).with(MockDatabase)

;(async () => {
  {
    const expected = [
      { name: 'MARIA' },
      { name: 'JOÃO' }
    ]
    rewiremock.enable()

    const UserFactory = require('../src/factory/userFactory')

    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find()

    deepStrictEqual(result, expected)

    rewiremock.disable()
  }
})()