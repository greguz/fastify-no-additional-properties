import test from 'ava'
import Fastify from 'fastify'

import noAdditionalProperties from '../fnap.mjs'

test('undefined', async t => {
  t.plan(2)

  const fastify = Fastify()
  t.teardown(() => fastify.close())

  fastify.route({
    method: 'POST',
    url: '/foo/:a/:b',
    async handler (request) {
      return {
        body: request.body,
        headers: request.headers,
        params: request.params,
        query: request.query
      }
    }
  })

  await fastify.register(noAdditionalProperties, {
    body: true,
    headers: true,
    params: true,
    query: true
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
      a: '0',
      b: '1'
    },
    query: {
      a: '0',
      b: '1'
    },
    headers: {
      a: '0',
      b: '1'
    },
    body: {
      a: '0',
      b: '1'
    }
  })
})
