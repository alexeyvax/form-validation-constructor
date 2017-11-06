const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: "./src/index.ts",
    example: "./example/index.js",
  },
  output: {
    filename: "./public/[name].js",
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
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
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
