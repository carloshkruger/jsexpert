export default class Util {
  static upperCaseFirstLetter(string) {
    return Util.#transform({ string })
  }

  static lowerCaseFirstLetter(string) {
    return Util.#transform({ string, upperCase: false })
  }

  static #transform({ string: [first, ...rest], upperCase = true }) {
    if (!first) {
      return ''
    }

    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase()

    return [firstLetter, ...rest].join('')
  } 
}
