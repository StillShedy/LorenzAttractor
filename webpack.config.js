const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // or 'development'
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean old files in /dist
  },
  optimization: {
    splitChunks: false, // Bundle everything (Three.js, etc.) into one JS file
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use your HTML file as a template
    }),
  ],
};
