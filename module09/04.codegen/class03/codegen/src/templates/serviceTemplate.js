import Util from './../util.js'

const COMPONENT_NAME_ANCHOR = '$$componentName'
const CURRENT_CONTEXT_ANCHOR = '$$currentContext'
const REPOSITORY_ANCHOR = '$$repositoryName'

export const template = `
export default class ${COMPONENT_NAME_ANCHOR}Service {
  constructor({ repository: ${REPOSITORY_ANCHOR} }) {
    ${CURRENT_CONTEXT_ANCHOR} = ${REPOSITORY_ANCHOR}
  }

  create(data) {
    return ${CURRENT_CONTEXT_ANCHOR}.create(data)
  }

  read(query) {
    return ${CURRENT_CONTEXT_ANCHOR}.read(query)
  }

  update(id, data) {
    return ${CURRENT_CONTEXT_ANCHOR}.update(id, data)
  }

  delete(id) {
    return ${CURRENT_CONTEXT_ANCHOR}.delete(id)
  }
}
`

export function serviceTemplate(componentName, repositoryName) {
  const currentContext = `this.${repositoryName}`
  const finalTemplate = template
    .replaceAll(COMPONENT_NAME_ANCHOR, Util.upperCaseFirstLetter(componentName))
    .replaceAll(CURRENT_CONTEXT_ANCHOR, currentContext)
    .replaceAll(REPOSITORY_ANCHOR, repositoryName)
  
  return {
    fileName: `${componentName}Service`,
    template: finalTemplate
  }
}
