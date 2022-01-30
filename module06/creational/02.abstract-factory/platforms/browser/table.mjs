import { TableComponent } from "../../shared/base/tableComponent.mjs";

export class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data)
    document.body.insertAdjacentHTML('afterBegin', template)
  }

  prepareData(data) {
    const joinLists = list => list.join('')

    const [firstItem] = data
    const headers = Object.keys(firstItem)
                      .map(text => `<th scope="col">${text}</th>`)
    const bodyValues = data
      .map(item => Object.values(item))
      .map(item => item.map(value => `<td>${value}</td>`))
      .map(tds => `<tr>${joinLists(tds)}</tr>`)
    const template = `
      <table class="table">
        <thead>
          <tr>
            ${joinLists(headers)}
          </tr>
        </thead>
        <tbody>
          ${joinLists(bodyValues)}
        </tbody>
      </table>
    `
    return template
  }
}