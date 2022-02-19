import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'

import Util from './../../src/util.js'

describe('#Util - string', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  })

  test('upperCaseFirstLetter should transform the first letter in upper case', () => {
    const data = 'hello'
    const expected = 'Hello'
    const result = Util.upperCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })

  test('lowerCaseFirstLetter should transform the first letter in lower case', () => {
    const data = 'Hello'
    const expected = 'hello'
    const result = Util.lowerCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })

  test('upperCaseFirstLetter given an empty string it should return empty', () => {
    const data = ''
    const expected = ''
    const result = Util.upperCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })

  test('lowerCaseFirstLetter given an empty string it should return empty', () => {
    const data = ''
    const expected = ''
    const result = Util.lowerCaseFirstLetter(data)

    expect(result).toStrictEqual(expected)
  })
})