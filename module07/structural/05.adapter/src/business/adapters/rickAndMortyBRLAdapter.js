import { RickAndMortyBRL } from '../integrations/rickAndMortyBRL.js'

export class RickAndMortyBRLAdapter {
  static async getCharacters() {
    return RickAndMortyBRL.getCharactersFromJSON()
  }
}