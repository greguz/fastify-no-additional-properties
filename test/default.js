const test = require('ava')
const Fastify = require('fastify')
const S = require('fluent-json-schema').default

const noAdditionalProperties = require('../fnap.js')

test('default', async t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  await fastify.register(noAdditionalProperties, {
    body: true,
    headers: true,
    params: true,
    query: true,
    response: true
  })

  const schema = S.object()
    .prop('a', S.integer())
    .required()

  fastify.route({
    method: 'POST',
    url: '/foo/:a/:b',
    handler (request, reply) {
      reply.send({
        a: '0',
        b: '1',
        body: request.body,
        headers: request.headers,
        params: request.params,
        query: request.query
      })
    },
    schema: {
      body: schema,
      headers: schema,
      params: schema,
      querystring: schema,
      response: {
        200: S.object()
          .prop('body')
          .prop('headers')
          .prop('params')
          .prop('query')
          .extend(schema)
      }
    }
  })

  const response = await fastify.inject({
    method: 'POST',
    url: '/foo/0/1?a=0&b=1',
    headers: {
      a: '0',
      b: '1'
    },
    payload: {
      a: '0',
      b: '1'
    }
  })

  t.like(response, {
    statusCode: 200
  })

  t.like(JSON.parse(response.payload), {
    params: {
      a: 0,
      b: undefined
    },
    query: {
      a: 0,
      b: undefined
    },
    headers: {
      a: 0,
      b: undefined
    },
    body: {
      a: 0,
      b: undefined
    },
    a: 0,
    b: undefined
  })
})
