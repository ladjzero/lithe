var path = require('path')

module.exports = {
    entry: {
        app: './js/dev/main.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}
