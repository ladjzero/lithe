var path = require('path')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
    {test: /\.vue$/, loader: 'vue'},
    {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    {test: /\.css$/, loader: 'style-loader!css-loader?root=/dist/'},
    {test: /\.(png|svg|gif)$/, loader: 'file-loader'}
    ]
  }
}
