# fastify-no-additional-properties

[![npm version](https://badge.fury.io/js/fastify-no-additional-properties.svg)](https://badge.fury.io/js/fastify-no-additional-properties)
[![Dependencies Status](https://david-dm.org/greguz/fastify-no-additional-properties.svg)](https://david-dm.org/greguz/fastify-no-additional-properties.svg)
![ci](https://github.com/greguz/fastify-no-additional-properties/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/greguz/fastify-no-additional-properties/badge.svg?branch=master)](https://coveralls.io/github/greguz/fastify-no-additional-properties?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Add `additionalProperties: false` by default to your JSON Schemas.

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
