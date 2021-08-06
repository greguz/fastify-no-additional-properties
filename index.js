'use strict'

const makePlugin = require('fastify-plugin')

function mapValues (object, iteratee) {
  const result = {}
  Object.keys(object).forEach(key => {
    result[key] = iteratee(object[key], key, object)
  })
  return result
}

function updateSchema (data) {
  if (Array.isArray(data)) {
    return data.map(updateSchema)
  } else if (typeof data === 'object' && data !== null) {
    const result = mapValues(data, updateSchema)
    if (result.type === 'object') {
      result.additionalProperties = result.additionalProperties || false
    }
    return result
  } else {
    return data
  }
}

function plugin (fastify, options, callback) {
  options = Object.assign(
    {
      body: true,
      headers: false,
      params: false,
      query: false,
      response: false
    },
    options || {}
  )

  fastify.addHook('onRoute', route => {
    if (route.schema) {
      if (route.schema.body && options.body) {
        route.schema.body = updateSchema(route.schema.body.valueOf())
      }
      if (route.schema.headers && options.headers) {
        route.schema.headers = updateSchema(route.schema.headers.valueOf())
      }
      if (route.schema.params && options.params) {
        route.schema.params = updateSchema(route.schema.params.valueOf())
      }
      if (route.schema.querystring && options.query) {
        route.schema.querystring = updateSchema(
          route.schema.querystring.valueOf()
        )
      }
      if (route.schema.response) {
        route.schema.response = mapValues(
          route.schema.response,
          schema => updateSchema(schema.valueOf())
        )
      }
    }
  })

  callback()
}

module.exports = makePlugin(plugin, {
  fastify: '^3.0.0',
  name: 'fastify-no-additional-properties'
})
