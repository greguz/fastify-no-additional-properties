export default {
  input: './fnap.mjs',
  output: {
    file: './fnap.cjs',
    format: 'cjs'
  },
  external: ['fastify-plugin']
}
