var path = require('path')

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
      loaders: [
        {test: /\.vue$/, loader: 'vue'},
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
      ]
    }
}
