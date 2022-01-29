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

    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
    const onlyPerson = this.#content.match(matchPerson)

    this.#content = onlyPerson

    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentAPI