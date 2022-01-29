const { evaluateRegex } = require('./util')
const Person = require('./person')

class TextProcessorFluentAPI {
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    // ?<=  get the text that comes after this group
    // [contratante|contratada] one or other (using "i" at the and of the expression to be case insensitive)
    // :\s{1}  will look for the literal ":" followed by a space
    // everything above will be inside parentheses, which means that I want everything after that

    // (?!\s) negative look around, will ignore the "contratante" and "contratada" that have only blank spaces after them
    // .*\n  will catch anything until the first \n
    // .*? non greety, this "?" will make that the regex stops at the first occurrence, avoiding loops
    // $  informs that the search will end at the end of the line

    // g global
    // m multiline
    // i case insensitive

    const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    const onlyPerson = this.#content.match(matchPerson)

    this.#content = onlyPerson

    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, '')))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI