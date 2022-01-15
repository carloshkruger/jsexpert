import database from '../database.json';
import { TerminalController } from './terminalController.js';
import { Person } from './person.js'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const awswer = await terminalController.question('What???')
    
    if (awswer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process has finished.')
      return
    }

    const person = Person.generateInstanceFromString(awswer)

    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))

    await save(person)

    return mainLoop()
  }
  catch (error) {
    console.log('Error', error)
    return mainLoop()
  }
}

await mainLoop()