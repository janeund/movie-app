const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        // test: /\.s[ac]ss$/i,
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader'
          // 'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'MSB | Home Page',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Movies',
      filename: 'movie-details.html',
      template: './src/movie-details.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Movies',
      filename: 'show-details.html',
      template: './src/show-details.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Movies',
      filename: 'movies.html',
      template: './src/movies.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Shows',
      filename: 'shows.html',
      template: './src/shows.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Shows',
      filename: 'people.html',
      template: './src/people.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Shows',
      filename: 'person-details.html',
      template: './src/person-details.html',
    }),
    new HtmlWebpackPlugin({
      title: 'MSB | Shows',
      filename: 'search.html',
      template: './src/search.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};