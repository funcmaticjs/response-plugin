const f = require('@funcmaticjs/funcmatic')
const ResponsePlugin = require('../lib/plugin')

describe('Funcmatic Plugin', async () => {
  let func = null
  let ctx = null
  let plugin = null
  beforeEach(async () => {
    plugin = new ResponsePlugin()
    func = f.create()
    func.plugin(plugin)
    ctx = { }
  })
  it ('should set response for env hook', async () => {
    func.env(async (ctx) => {
      expect(ctx.response).toBeTruthy()
    })
    await func.invokeEnv(ctx)
  })
  it ('should set response for start hook', async () => {
    func.start(async (ctx) => {
      expect(ctx.response).toBeTruthy()
    })
    await func.invokeStart(ctx)
  })
  it ('should set response for request hook', async () => {
    func.request(async (ctx) => {
      expect(ctx.response).toBeTruthy()
    })
    await func.invokeRequest(ctx)
  })
  it ('should set response for error hook', async () => {
    func.error(async (ctx) => {
      expect(ctx.response).toBeTruthy()
    })
    await func.invokeError(ctx)
  })
  it ('should not set response if already in context', async () => {
    ctx.response = { hello: 'world' }
    func.request(async (ctx) => {
      expect(ctx.response).toMatchObject({
        hello: 'world'
      })
    })
    await func.invokeRequest(ctx)
  })
  it ('should handle a simple json response', async () => {
    func.request(async (ctx) => {
      ctx.response.json({ hello: 'world' })
    })
    await func.invoke(ctx)
    expect(ctx.response).toMatchObject({
      statusCode: 200,
      multiValueHeaders: {
        'content-type': [ 'application/json; charset=utf-8' ]
      },
      body: JSON.stringify({ hello: 'world' }),
      isBase64Encoded: false
    })
  })
  it ('should not result in JSON circular reference error', async () => {
    func.request(async (ctx) => {
      console.log(JSON.stringify(ctx.response))
    })
    await func.invoke(ctx)
  })
})

