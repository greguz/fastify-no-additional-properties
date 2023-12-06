import test from 'ava'
import Fastify from 'fastify'

import noAdditionalProperties from '../fnap.mjs'

test('array', async t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  await fastify.register(noAdditionalProperties, {
    body: true
  })

  fastify.route({
    method: 'POST',
    url: '/array',
    schema: {
      body: {
        type: ['null', 'object'],
        properties: {
          value: {
            type: 'number'
          }
        }
      }
    },
    handler (request, reply) {
      t.deepEqual(request.body, { value: 42 })
      reply.code(204).send()
    }
  })

  const response = await fastify.inject({
    method: 'POST',
    url: '/array',
    payload: {
      hello: 'world',
      value: 42
    }
  })
  t.like(response, {
    statusCode: 204
  })
})
