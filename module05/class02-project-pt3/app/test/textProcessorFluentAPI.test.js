const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI')
const mock = require('./mock/valid')

describe('TextProcessorFluentAPI', () => {
  it('#build', () => {
    const result = new TextProcessorFluentAPI(mock).build()
    
    expect(result).to.be.deep.equal(mock)
  })

  it('#extractPeopleData', () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build()
    const expected = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
      ].join('\n'),
    ]

    expect(result).to.be.deep.equal(expected)
  })

  it('divideTextInColumns', () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
    ]

    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ]
    ]

    const result = new TextProcessorFluentAPI(content).divideTextInColumns().build()

    expect(result).to.be.deep.equal(expected)
  })

  it('removeEmptyCharacters', () => {
    const content = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ]
    ]

    const expected = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.'
      ]
    ]

    const result = new TextProcessorFluentAPI(content).removeEmptyCharacters().build()

    expect(result).to.be.deep.equal(expected)
  })

  it('mapPerson', () => {
    const content = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.'
      ]
    ]

    const result = new TextProcessorFluentAPI(content).mapPerson().build()
    const expected = [
      {
        nome: 'Xuxa da Silva',
        nacionalidade: 'Brasileira',
        estadoCivil: 'Casada',
        documento: '23574342012',
        rua: 'Rua dos bobos',
        numero: 'zero',
        bairro: 'Alphaville',
        estado: 'São Paulo'
      }
    ]
    expect(result).to.be.deep.equal(expected)
  })
})