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
      query: true
    },
    options
  )

  fastify.addHook('onRoute', route => {
    if (route.schema) {
      if (route.schema.body && options.body) {
        route.schema.body = updateSchema(route.schema.body)
      }
      if (route.schema.headers && options.headers) {
        route.schema.headers = updateSchema(route.schema.headers)
      }
      if (route.schema.params && options.params) {
        route.schema.params = updateSchema(route.schema.params)
      }
      if (route.schema.querystring && options.query) {
        route.schema.querystring = updateSchema(route.schema.querystring)
      }
    }
  })

  callback()
}

module.exports = makePlugin(plugin, {
  fastify: '^2.0.0 || ^3.0.0',
  name: 'no-additional-properties'
})
