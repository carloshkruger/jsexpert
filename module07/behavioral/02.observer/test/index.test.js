import { jest } from '@jest/globals'
import { Payment } from '../src/events/payment.js'
import { Marketing } from '../src/observers/marketing.js'
import { Shipment } from '../src/observers/shipment.js'
import { PaymentSubject } from '../src/subjects/paymentSubject.js'

describe('Test suite for Observer Pattern', () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  })

  test('#PaymentSubject notify observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'Hello World'
    const expected = data

    subject.subscribe(observer)
    subject.notify(data)
    expect(observer.update).toBeCalledWith(expected)
  })

  test('#PaymentSubject should not notify unsibscribed observers', () => {
    const subject = new PaymentSubject()
    const observer = {
      update: jest.fn()
    }
    const data = 'Hello World'

    subject.subscribe(observer)
    subject.unsubscribe(observer)
    subject.notify(data)
    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#PaymentSubject notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)
    const paymentSubjectNotifySpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name)
    const data = { userName: 'Carlos', id: Date.now() }

    payment.creditCard(data)

    expect(paymentSubjectNotifySpy).toBeCalledWith(data)
  })

  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)
    const shipment = new Shipment()
    const marketing = new Marketing()

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name)
    const marketingSpy = jest.spyOn(marketing, marketing.update.name)

    subject.subscribe(shipment)
    subject.subscribe(marketing)

    const data = { userName: 'Carlos', id: Date.now() }

    payment.creditCard(data)

    expect(shipmentSpy).toBeCalledWith(data)
    expect(marketingSpy).toBeCalledWith(data)
  })
})