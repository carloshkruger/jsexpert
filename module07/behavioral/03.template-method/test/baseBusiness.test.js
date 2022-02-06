import { expect, describe, test, jest } from '@jest/globals'
import { BaseBusiness } from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions.js'

describe('BaseBusiness', () => {
  test('should throw an error when child class does not implement _validateRequiredFields method', () => {
    class ConcreateClass extends BaseBusiness {}

    const concreteClass = new ConcreateClass()
    const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name)

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should throw an error when _validateRequiredFields returns false', () => {
    class ConcreateClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(false)
    }

    const concreteClass = new ConcreateClass()
    const validationError = Error('Invalid data')

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should throw an error when child class does not implement _create method', () => {
    class ConcreateClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(true)
    }

    const concreteClass = new ConcreateClass()
    const validationError = new NotImplementedException(concreteClass._create.name)

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  test('should call _create and _validateRequiredFields on create', () => {
    class ConcreateClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockReturnValue(true)
      _create = jest.fn().mockReturnValue(true)
    }

    const concreteClass = new ConcreateClass()
    const createFromBaseClass = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name)
    const result = concreteClass.create({})

    expect(result).toBeTruthy()
    expect(createFromBaseClass).toHaveBeenCalled()
    expect(concreteClass._create).toHaveBeenCalled()
    expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
  })
})