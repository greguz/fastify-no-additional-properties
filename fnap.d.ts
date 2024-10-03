import type { FastifyPluginCallback } from 'fastify'

export interface FastifyNoAdditionalPropertiesOptions {
  /**
   * If true, update the request body schema.
   * @default true
   */
  body?: boolean
  /**
   * If true, update the request headers schema.
   * @default false
   */
  headers?: boolean
  /**
   * If true, update the URL parameters schema.
   * @default false
   */
  params?: boolean
  /**
   * If true, update the URL querystring schema.
   * @default true
   */
  query?: boolean
  /**
   * If true, update all response schemas.
   * @default false
   */
  response?: boolean
  /**
   * If true, update schemas registered **AFTER** this plugin registration.
   * @default false
   */
  ref?: boolean
}

declare const plugin: FastifyPluginCallback<FastifyNoAdditionalPropertiesOptions>

export default plugin
