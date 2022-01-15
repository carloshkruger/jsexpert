"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{Person(v){Person=v}},2);



const { describe, it } = mocha
const { expect } = chai

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Car 20000 2022-01-01 2022-01-02'
    )

    const expected = {
      id: '1',
      vehicles: ['Bike', 'Car'],
      kmTraveled: '20000',
      from: '2022-01-01',
      to: '2022-01-02'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: '1',
      vehicles: ['Bike', 'Car'],
      kmTraveled: '20000',
      from: '2022-01-01',
      to: '2022-01-02'
    })

    const result = person.formatted('pt-BR')

    const expected = {
      id: 1,
      vehicles: 'Bike e Car',
      kmTraveled: '20.000 km',
      from: '01 de janeiro de 2022',
      to: '02 de janeiro de 2022'
    }

    expect(result).to.be.deep.equal(expected)
  })
})
