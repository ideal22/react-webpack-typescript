const path = require('path')
const {
  optimization,
  filename,
  plugins,
  cssLoaders,
} = require('./webpack.utils')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    open: true,
    compress: true,
    stats: 'errors-only',
    overlay: true,
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(png|jpg|svg|gif|ico|icon)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(tsx||ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
