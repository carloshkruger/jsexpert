import { NotImplementedException } from '../notImplementedException.mjs'

export class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name)
  }
}
