import { NotImplementedException } from '../notImplementedException.mjs'

export class ViewFactory {
  createTable(data) {
    throw new NotImplementedException(this.createTable.name)
  }
}
