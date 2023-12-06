import test from 'ava'
import Fastify from 'fastify'

import noAdditionalProperties from '../fnap.mjs'

test('disabled', async t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  await fastify.register(noAdditionalProperties, {
    body: false,
    headers: false,
    params: false,
    query: false
  })

  const schema = {
    type: 'object',
    properties: {
      a: {
        type: 'integer'
      }
    },
    required: ['a', 'b']
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
      a: 0,
      b: '1'
    },
    payload: {
      a: 0,
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
