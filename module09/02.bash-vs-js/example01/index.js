const { existsSync, mkdirSync, rmSync } = require('fs')
const { execSync } = require('child_process')

const getFileName = index => index >= 3 ? `js-0${index}` : `mjs-0${index}`

const removeFolder = folderName => rmSync(`./${folderName}`, { recursive: true })

const makeDir = (folderName) => {
  if (existsSync(folderName)) {
    removeFolder(folderName)
  }

  mkdirSync(folderName)

  return folderName
}

const initializePackage = folderName => {
  execSync('npm init -y --scope @carloshkruger --silent', {
    cwd: `./${folderName}`
  })

  return folderName
}

const printNameAndPackageVersion = folderName => {
  const { name, version } = require(`./${folderName}/package.json`)
  console.log({ n: name, v: version })
  return folderName
}

const FOLDER_AMOUNT = 4

Array
  .from(Array(FOLDER_AMOUNT).keys(4))
  .map(index => makeDir(getFileName(index + 1)))
  .map(initializePackage)
  .map(printNameAndPackageVersion)
  .map(removeFolder)
