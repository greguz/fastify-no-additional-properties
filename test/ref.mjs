import test from 'ava'
import Fastify from 'fastify'

import noAdditionalProperties from '../fnap.mjs'

test('ref', async t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  await fastify.register(noAdditionalProperties, {
    body: true,
    ref: true
  })

  fastify.addSchema({
    $id: 'http://example.com/',
    type: 'object',
    properties: {
      value: {
        type: 'integer'
      }
    }
  })

  fastify.route({
    method: 'POST',
    url: '/foo',
    schema: {
      body: {
        $ref: 'http://example.com/#'
      }
    },
    handler (request, reply) {
      reply.send(request.body)
    }
  })

  const response = await fastify.inject({
    method: 'POST',
    url: '/foo',
    payload: {
      value: 42,
      hello: 'world'
    }
  })
  t.like(response, { statusCode: 200 })
  t.deepEqual(JSON.parse(response.payload), { value: 42 })
})
