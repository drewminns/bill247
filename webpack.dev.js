const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

const dist = path.join(__dirname, 'dist')
const env = dotenv.config().parsed

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: dist,
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}
