const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/invalid-header.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }

  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    Date.prototype.getFullYear = () => 2020
    const expected = [
      {
        "name": "Carlos Kruger",
        "id": 123,
        "profession": "Javascript Developer",
        "birthDay": 1998
      },
      {
        "name": "Xuxa da Silva",
        "id": 124,
        "profession": "Javascript Specialist",
        "birthDay": 1992
      },
      {
        "name": "Joaozinho",
        "id": 125,
        "profession": "Java Developer",
        "birthDay": 1972
      }
    ]
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()