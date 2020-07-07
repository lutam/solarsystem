const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const portfinderSync = require('portfinder-sync');


const config = {
  context: path.resolve(__dirname, 'assets'),
  nameHashLength: 8,
};

const devServerConfig = {
  host: '127.0.0.1',
  port: portfinderSync.getPort(8000),
};

module.exports = (env, argv) => ({
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js',
      '@': config.context,
    },
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
    devServer: {
    hot: true,
    host: devServerConfig.true,
    port: devServerConfig.port,
    https: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
}
);
