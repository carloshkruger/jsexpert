import { describe, test, expect, jest } from '@jest/globals'
import { RickAndMortyUSAAdapter } from '../../src/business/adapters/rickAndMortyUSAAdapter.js'
import { RickAndMortyUSA } from '../../src/business/integrations/rickAndMortyUSA.js'

describe('RickAndMortyUSAAdapter', () => {
  test('#getCharacters should be an adapter', async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()

    expect(usaIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})