import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll
} from '@jest/globals'
import { tmpdir } from 'os'
import fsPromises from 'fs/promises'
import { join } from 'path'
import templates from './../../src/templates/index.js'
import { createLayersIfNotExists } from './../../src/createLayers.js'

const {
  factoryTemplate,
  repositoryTemplate,
  serviceTemplate
} = templates

async function getFolders({ mainPath, defaultMainFolder }) {
  return fsPromises.readdir(join(mainPath, defaultMainFolder))
}

describe('#Integration - Layers - Folders structure', () => {
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'repository'].sort()
  }

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  })

  test('should create folders if it does not exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)

    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })

  test('should not create folders if it exists', async () => {
    const beforeRun = await getFolders(config)

    await createLayersIfNotExists(config)

    const afterRun = await getFolders(config)

    expect(afterRun).toEqual(beforeRun)
  })
})
