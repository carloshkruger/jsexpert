import { describe, test, expect, jest } from '@jest/globals'
import { RickAndMortyBRLAdapter } from '../../src/business/adapters/rickAndMortyBRLAdapter.js'
import { RickAndMortyBRL } from '../../src/business/integrations/rickAndMortyBRL.js'

describe('RickAndMortyBRLAdapter', () => {
  test('#getCharacters should be an adapter', async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([])

    const result = await RickAndMortyBRLAdapter.getCharacters()

    expect(brlIntegration).toHaveBeenCalled()
    expect(result).toEqual([])
  })
})