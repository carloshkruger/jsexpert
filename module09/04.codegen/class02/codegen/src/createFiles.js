import fsPromises from 'fs/promises'
import fs from 'fs'
import templates from './templates/index.js'
import Util from './util.js'

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [
      `${componentName}Repository`
    ],
    factory: [
      `${componentName}Repository`,
      `${componentName}Service`
    ]
  }

  return dependencies[layer].map(Util.lowerCaseFirstLetter)
}

async function executeWrites(pendindFilesToWrite) {
  return Promise.all(pendindFilesToWrite.map(({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile)))
}

export async function createFiles({
  mainPath,
  defaultMainFolder,
  layers,
  componentName
}) {
  const keys = Object.keys(templates)

  const pendindFilesToWrite = []

  for (const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer))

    if (!chosenTemplate) {
      return { error: 'the chosen layer does not have a tempalte' }
    }

    const template = templates[chosenTemplate]
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`
    const dependencies = defaultDependencies(layer, componentName)
    const { fileName: className, template: txtFile } = template(componentName, ...dependencies)
    const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(className)}.js`
    pendindFilesToWrite.push({ fileName, txtFile })
  }

  await executeWrites(pendindFilesToWrite)

  return { success: true }
}