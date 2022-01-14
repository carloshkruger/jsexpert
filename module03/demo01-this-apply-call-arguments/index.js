'use strict'

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()

// This way, "this" inside "file.watch" will be the "this" of function "watch" from "fs" package
// watch(__filename, file.watch)

// An alternative, but this is not pretty
// watch(__filename, (event, filename) => file.watch(event, filename))

// A better way to resolve the "this" problem is using "bind", where its possible to set the context,
// in this case, the file instance itself
// watch(__filename, file.watch.bind(file))

// "call" and "apply" are almost the same thing.
// Using call, the arguments are passed as a list of arguments
// Using apply, the arguments are passed inside an array.
file.watch.call({ showContent: () => console.log('call') }, null, __filename)
file.watch.apply({ showContent: () => console.log('apply') }, [null, __filename])

