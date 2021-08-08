module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  rules:[
    {
      test: /\.sass$/,
      loaders: ['style', 'css', 'sass']
    }
  ]
}
