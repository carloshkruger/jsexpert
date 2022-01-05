class Fibanacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0
    }

    // Retorna o valor
    yield current
    //delega a função, mas nção retorna valor
    yield* this.execute(input - 1, next, current + next)
  }
}

module.exports = Fibanacci