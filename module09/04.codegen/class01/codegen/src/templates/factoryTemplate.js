import Util from './../util.js'

const SERVICE_NAME_ANCHOR = '$$serviceName$$'
const REPOSITORY_NAME_ANCHOR = '$$repositoryName$$'
const SERVICE_NAME_DEPENDENCY_ANCHOR = '$$serviceNameDependency$$'
const REPOSITORY_NAME_DEPENDENCY_ANCHOR = '$$repositoryNameDependency$$'
const COMPONENT_NAME_ANCHOR = '$$componentName$$'

export const template = `
import ${SERVICE_NAME_ANCHOR} from '../service/${SERVICE_NAME_DEPENDENCY_ANCHOR}.js'
import ${REPOSITORY_NAME_ANCHOR} from '../repository/${REPOSITORY_NAME_DEPENDENCY_ANCHOR}.js'

export default class ${COMPONENT_NAME_ANCHOR}Factory {
  static getInstance() {
    const repository = new ${REPOSITORY_NAME_ANCHOR}()
    const service = new ${SERVICE_NAME_ANCHOR}({ repository })
    return service
  }
}
`

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const finalTemplate = template
    .replaceAll(COMPONENT_NAME_ANCHOR, Util.upperCaseFirstLetter(componentName))
    .replaceAll(REPOSITORY_NAME_ANCHOR, Util.upperCaseFirstLetter(repositoryName))
    .replaceAll(SERVICE_NAME_ANCHOR, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(REPOSITORY_NAME_DEPENDENCY_ANCHOR, Util.lowerCaseFirstLetter(repositoryName))
    .replaceAll(SERVICE_NAME_DEPENDENCY_ANCHOR, Util.lowerCaseFirstLetter(serviceName))

  return {
    fileName: `${componentName}Factory`,
    template: finalTemplate
  }
}