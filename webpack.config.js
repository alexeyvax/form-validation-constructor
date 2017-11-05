const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: "./src/index.ts",
  output: {
    filename: "./public/index.js",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
        }, {
            loader: 'less-loader',
        }]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        }],
      },
    ],
  },
  resolve: {
		extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
  ],
}
