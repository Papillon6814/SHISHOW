module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: ['@import "./static/scss/BaseSettings.scss";',
              '@import "./static/scss/Temporary/sass/TemporaryFile.scss"',
              '@import "./static/scss/Temporary/stylesheets/TemporaryFile.css"'
              '@import "./static/JS/TemporaryFile.js"']
      }
    }
  }
}
