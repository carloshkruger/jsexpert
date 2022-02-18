import {
  expect,
  describe,
  test,
  jest,
  beforeEach
} from '@jest/globals'

import fsPromises from 'fs/promises'
import templates from './../../src/templates/index.js'
import { createFiles } from '../../src/createFiles'

describe('#Layers - files structure', () => {
  const defaultLayers = ['service', 'factory', 'repository']
  const config = {
    mainPath: './',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'heroes' 
  }
  const repositoryLayer = `${config.componentName}Repository`
  const serviceLayer = `${config.componentName}Service`

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  })

  test('should not create file structure on inexistent templates', async () => {
    const myConfig = { ...config, layers: ['inexistent'] }
    const expected = { error: 'the chosen layer does not have a tempalte' }
    const result = await createFiles(myConfig)

    expect(result).toStrictEqual(expected)
  })

  test('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockResolvedValue()
    jest.spyOn(templates, 'repositoryTemplate')
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = { ...config, layers: ['repository'] }
    const expected = { success: true }
    const result = await createFiles(myConfig)

    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
  })

  test('service should have repository as dependency', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockResolvedValue()
    jest.spyOn(templates, 'repositoryTemplate')
      .mockReturnValue({ fileName: '', template: '' })
    jest.spyOn(templates, 'serviceTemplate')
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = { ...config, layers: ['repository', 'service'] }
    const expected = { success: true }
    const result = await createFiles(myConfig)

    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
  })

  test('factory should have repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, 'writeFile').mockResolvedValue()
    jest.spyOn(templates, 'repositoryTemplate')
      .mockReturnValue({ fileName: '', template: '' })
    jest.spyOn(templates, 'serviceTemplate')
      .mockReturnValue({ fileName: '', template: '' })
      jest.spyOn(templates, 'factoryTemplate')
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = { ...config, layers: ['repository', 'service', 'factory'] }
    const expected = { success: true }
    const result = await createFiles(myConfig)

    expect(result).toStrictEqual(expected)
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.factoryTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer, serviceLayer)
  })
})
