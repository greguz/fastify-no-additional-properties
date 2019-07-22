# fastify-no-additional-properties

Make `additionalProperties: false` by default.

## Install

```
npm install --save fastify-no-additional-properties
```

## Usage

Register this plugin and you are done!

```javascript
const fastify = require('fastify')()

// Default options
fastify.register(require('fastify-no-additional-properties'), {
  // Enable this plugin for body schema
  body: true,
  // Enable this plugin for request headers schema
  headers: false,
  // Enable this plugin for URL parameters schema
  params: false,
  // Enable this plugin for query string schema
  query: true
})

// Register web routes here...

fastify.listen(3000, err => {
  if (err) throw err
})
```
