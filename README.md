# fastify-no-additional-properties

[![npm version](https://badge.fury.io/js/fastify-no-additional-properties.svg)](https://www.npmjs.com/package/fastify-no-additional-properties)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/fastify-no-additional-properties)
![ci](https://github.com/greguz/fastify-no-additional-properties/workflows/ci/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/greguz/fastify-no-additional-properties/badge.svg?branch=master)](https://coveralls.io/github/greguz/fastify-no-additional-properties?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Add `additionalProperties: false` by default to your JSON Schemas.

Under Fastify, when a JSON schema is defined without the `additionalProperties` field, the output will be the same as defining It as `true`. I think that this is somehow counterintuitive.

This plugin will default that field to `false` by default. It's also possible to configure which schema needs to be updated.

All schemas are updated by copying the entire definition, so the source objects are left untouched.

## Features

- **Zero dependencies**: small footprint (ignoring `fastify-plugin`).
- **ESM**: future proof for the next Node.js releases.
- **Common.js support**: still compatible with older runtimes.
- **Sane defaults**: I suppose.
- **TypeScript**: types declaration included.

## Install

```
npm install --save fastify-no-additional-properties
```

## Usage

```javascript
import Fastify from 'fastify'
import noAdditionalProperties from 'fastify-no-additional-properties'

const fastify = Fastify({
  logger: true
})

fastify.register(noAdditionalProperties, {
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

// From now on, all registered routes will have additionalProperties: false by default.

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.fatal({ err }, 'bootstrap failed')
    process.exit(1)
  }
  // Server is now listening on ${address}
})
```
