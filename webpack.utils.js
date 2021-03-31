const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }
  if (isProd) {
    config.minimizer = [new TerserWebpackPlugin()]
  }

  return config
}

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: '../public/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
  ]

  return base
}

const cssLoaders = (extra) => {
  const loaders = [MiniCssExtractPlugin.loader, 'css-loader']

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

module.exports = {
  optimization,
  filename,
  plugins,
  cssLoaders,
}
