module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {},
    'postcss-template-variables':{
      prefix: 'lq',
      quotes: true,
      template: {
        start: '{{',
        end: '}}'
      }
    }
  }
}