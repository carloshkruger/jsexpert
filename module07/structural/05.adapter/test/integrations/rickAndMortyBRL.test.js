import { describe, test, expect, jest } from '@jest/globals'
import axios from 'axios'
import fs from 'fs/promises'
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.js'

import { Character } from '../../src/entities/character.js'

describe('RickAndMortyBRL', () => {
  test('#getCharactersFromJSON should return a list of Character entity', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'))
    const expected = response.results.map(character => new Character(character))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()

    expect(result).toStrictEqual(expected)
  })

  test('#getCharactersFromJSON should return an empty list if the API returns nothing', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'))
    const expected = response.results.map(character => new Character(character))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()

    expect(result).toStrictEqual(expected)
  })
})