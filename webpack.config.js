module.exports = {
  entry: './main.js',
  output: {
    path: './',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 8888
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx', '.css'],
      modulesDirectories: [
        'node_modules'
      ]
    }
  }
}
