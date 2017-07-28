module.exports = function() {
  var nodeModules = 'node_modules'
  var config = {
    build: './build/',
    client: '',
    /**
     * File paths
     */
    // all javascript that we want to vet
    alljs: [
      'www/js/app.js'
//    './*.js'
//    '!./src/client/app/lib/hammer.min.js' 不包含这些文件
    ]
  }
  return config
}
