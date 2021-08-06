# fastify-no-additional-properties

[![npm version](https://badge.fury.io/js/fastify-no-additional-properties.svg)](https://badge.fury.io/js/fastify-no-additional-properties)
[![Dependencies Status](https://david-dm.org/greguz/fastify-no-additional-properties.svg)](https://david-dm.org/greguz/fastify-no-additional-properties.svg)
![ci](https://github.com/greguz/fastify-no-additional-properties/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/greguz/fastify-no-additional-properties/badge.svg?branch=master)](https://coveralls.io/github/greguz/fastify-no-additional-properties?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Add `additionalProperties: false` by default to your JSON Schemas.

Under Fastify, when a JSON schema is defined without the `additionalProperties` field, the output will be the same as defining It as `true`. I think that this is somehow counterintuitive.

This plugin will default that field to `false` by default. It's also possible to configure which schema needs to be updated.

All schemas are updated by copying the entire definition, so the source objects are left untouched.

## Install

```
npm install --save fastify-no-additional-properties
```

## Usage

```javascript
const fastify = require('fastify')()

fastify.register(require('fastify-no-additional-properties'), {
  /**
   * If true, update the request body schema.
   * @default true
   */
  body: true,
  /**
   * If true, update the request headers schema.
   * @default false
   */
  headers: false,
  /**
   * If true, update the URL parameters schema.
   * @default false
   */
  params: false,
  /**
   * If true, update the URL querystring schema.
   * @default true
   */
  query: true,
  /**
   * If true, update all response schemas.
   * @default false
   */
  response: false
})

// From here, all registered routes will have additionalProperties: false by default.

fastify.listen(3000, err => {
  if (err) throw err
})
```
