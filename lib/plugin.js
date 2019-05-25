const createResponse = require('./response.js')

class ResponsePlugin {

  constructor() {
  }

  async env(ctx, next) {
    setResponse(ctx)
    await next()
  }

  async start(ctx, next) {
    setResponse(ctx)
    await next()
  }

  async request(ctx, next) {
    setResponse(ctx)
    await next()
  }

  async error(ctx, next) {
    setResponse(ctx)
    await next()
  }

  async teardown() {
    return // noop
  }
}

function setResponse(ctx) {
  if (!ctx.response) ctx.response = createResponse()
}

module.exports = ResponsePlugin