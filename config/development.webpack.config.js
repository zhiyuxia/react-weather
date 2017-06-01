var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
  return {
    entry: {
      main: path.resolve(__dirname, '..', 'app', "index.js"),
      vendor: ['bootstrap', 'react', 'react-dom'],
    },
    output: {
      path: path.join(__dirname, '..', 'build-dev'),
      filename: '[name].bundle.js', // main.bundle.js | tweets.bundle.js
    },
    module: {
      rules: [
        {
          test: /\.ya?ml$/,
          use: ['json-loader', 'yaml-loader'],
          // loader: 'json-loader!yaml-loader',
          include: path.resolve(__dirname, '..', 'app', 'config'),
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['react', ["es2015", { modules: false }]],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          // loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          // loaders: ['style-loader', 'css-loader', 'sass-loader']
          // loader: 'style-loader!css-loader!sass-loader'
          // use: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') WEBPACK 1
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!sass-loader",
          }),
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
          use: 'url-loader?limit=100000',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.coffee', '.ts', '.css', '.scss', '.json'],
      alias: {
        sectionThreeSolution$: path.resolve(__dirname, '..', 'app', 'sectionThreeSolution.js'),
        Api: path.resolve(__dirname, '..', 'app', 'apis'),
        welcomeUser$: path.resolve(__dirname, '..', 'app', 'welcomeUser.coffee'),
        typescript: path.resolve(__dirname, '..', 'app', 'ts'),
        reactApp$: path.resolve(__dirname, '..', 'app', 'react'),
        appConfig$: path.resolve(__dirname, '..', 'app', 'config', 'appConfig.yaml'),
      },
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.bundle.js',
        chunks: ['vendor'],
      }),
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'app', 'index.html'),
        hash: true,
        chunks: ['vendor', 'main'],
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new cleanWebpackPlugin(['build-dev'], {
        root: path.resolve(__dirname, '..'),
        verbose: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        env: JSON.stringify(env),
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, '..', 'build-dev'),
      inline: true,
      port: 4000,
      open: true,
    },
    // devtool: 'eval-source-map'
    // devtool: 'eval'
    devtool: 'cheap-module-eval-source-map',
  };
};
