import Http from 'http'

export async function InjectHttpInterceptor() {
  const oldEmit = Http.Server.prototype.emit;
  Http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args

    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'Carlos')
    }

    return oldEmit.apply(this, args)
  }
}
