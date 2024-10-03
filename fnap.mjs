import plugin from 'fastify-plugin'

function isObjectLike (value) {
  return typeof value === 'object' && value !== null
}

function mapValues (object, iteratee) {
  const result = {}
  for (const key of Object.keys(object)) {
    result[key] = iteratee(object[key], key, object)
  }
  return result
}

function updateSchema (data) {
  if (Array.isArray(data)) {
    return data.map(updateSchema)
  } else if (isObjectLike(data)) {
    const result = mapValues(data, updateSchema)
    if (isObjectType(result)) {
      result.additionalProperties = result.additionalProperties || false
    }
    return result
  } else {
    return data
  }
}

function isObjectType ({ type }) {
  return Array.isArray(type)
    ? type.includes('object')
    : type === 'object'
}

function fnap (fastify, options, done) {
  const opts = {
    body: true,
    headers: false,
    params: false,
    query: true,
    ref: false,
    response: false,
    ...options
  }

  if (opts.ref) {
    // This will lead to a bad idea :D
    const addSchemaBound = fastify.addSchema.bind(fastify)

    // ...return to monke
    fastify.addSchema = function fnapAddSchema (schema) {
      return addSchemaBound(
        isObjectLike(schema)
          ? updateSchema(schema.valueOf())
          : schema
      )
    }
  }

  fastify.addHook('onRoute', route => {
    if (isObjectLike(route.schema)) {
      if (opts.body && isObjectLike(route.schema.body)) {
        route.schema.body = updateSchema(route.schema.body.valueOf())
      }
      if (opts.headers && isObjectLike(route.schema.headers)) {
        route.schema.headers = updateSchema(route.schema.headers.valueOf())
      }
      if (opts.params && isObjectLike(route.schema.params)) {
        route.schema.params = updateSchema(route.schema.params.valueOf())
      }
      if (opts.query && isObjectLike(route.schema.querystring)) {
        route.schema.querystring = updateSchema(
          route.schema.querystring.valueOf()
        )
      }
      if (opts.response && isObjectLike(route.schema.response)) {
        route.schema.response = mapValues(
          route.schema.response,
          schema => updateSchema(schema.valueOf())
        )
      }
    }
  })

  done()
}

export default plugin(fnap, {
  fastify: '>=5.0.0',
  name: 'fastify-no-additional-properties'
})
