import Util from './../util.js'

const COMPONENT_NAME_ANCHOR = '$$componentName'

const template = `
export default class ${COMPONENT_NAME_ANCHOR}Repository {
  constructor() {}

  create(data) {
    return Promise.reject('method not implemented')
  }

  read(query) {
    return Promise.reject('method not implemented')
  }

  update(id, data) {
    return Promise.reject('method not implemented')
  }

  delete(id) {
    return Promise.reject('method not implemented')
  }
}
`

export function repositoryTemplate(componentName) {
  return {
    fileName: `${componentName}Repository`,
    template: template.replaceAll(COMPONENT_NAME_ANCHOR, Util.upperCaseFirstLetter(componentName))
  }
}
