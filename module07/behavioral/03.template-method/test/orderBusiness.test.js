import { expect, describe, test, jest } from '@jest/globals'
import { OrderBusiness } from '../src/business/orderBusiness.js'
import { Order } from '../src/entities/order.js'

describe('OrderBusiness', () => {
  test('execution OrderBusiness without template method', () => {
    const order = new Order({
      customerId: 1,
      amount: 100_000,
      products: [
        {
          description: 'car'
        }
      ]
    })

    const orderBusiness = new OrderBusiness()
    const isValid = orderBusiness._validateRequiredFields(order)
    expect(isValid).toBeTruthy()

    const result = orderBusiness._create(order)
    expect(result).toBeTruthy()
  })

  test('execution OrderBusiness with template method', () => {
    const order = new Order({
      customerId: 1,
      amount: 100_000,
      products: [
        {
          description: 'car'
        }
      ]
    })

    const orderBusiness = new OrderBusiness()
    const calledValidation = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
    const calledCreate = jest.spyOn(orderBusiness, orderBusiness._create.name)

    const result = orderBusiness.create(order)
    expect(result).toBeTruthy()
    expect(calledValidation).toHaveBeenCalled()
    expect(calledCreate).toHaveBeenCalled()
  })
})