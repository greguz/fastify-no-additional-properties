const test = require('ava')
const Fastify = require('fastify')

const noAdditionalProperties = require('../fnap.js')

test('defined', async t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  await fastify.register(noAdditionalProperties, {
    body: true,
    headers: true,
    params: true,
    query: true
  })

  const schema = {
    type: 'object',
    properties: {
      a: {
        type: 'integer'
      }
    },
    required: ['a', 'b'],
    additionalProperties: true
  }

  fastify.route({
    method: 'POST',
    url: '/foo/:a/:b',
    handler (request, reply) {
      reply.send({
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
      querystring: schema
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
      b: '1'
    },
    query: {
      a: 0,
      b: '1'
    },
    headers: {
      a: 0,
      b: '1'
    },
    body: {
      a: 0,
      b: '1'
    }
  })
})
