import { RickAndMortyUSA } from '../integrations/rickAndMortyUSA.js'

export class RickAndMortyUSAAdapter {
  static async getCharacters() {
    return RickAndMortyUSA.getCharactersFromXML()
  }
}