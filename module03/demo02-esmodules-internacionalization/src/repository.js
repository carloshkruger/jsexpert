import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
  const databaseFile = `${process.cwd()}/database.json`
  const currentData = JSON.parse(await readFile(databaseFile))
  currentData.push(data)
  await writeFile(databaseFile, JSON.stringify(currentData))
}