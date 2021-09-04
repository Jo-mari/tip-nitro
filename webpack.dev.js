const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin');
const fs = require('fs');
const path = require('path');
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

const htmlPlugins = generateHtmlPlugins('./src/build');

module.exports = merge(common, {
 devtool: "source-map",
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    contentBasePublicPath: '/dist/',
    //publicPath: '/dist/',
    watchContentBase: true,
    compress: true,
    writeToDisk: true,
    //open: true,
    hot: true,
  },
  plugins: [
    new HandlebarsWebpackPlugin({
      entry: path.join(process.cwd(), 'src', 'templates', 'views', '*.hbs'),
      output: path.join(process.cwd(), 'src', 'build', '[name].html'),

      partials: [
        path.join(process.cwd(), 'src', 'templates', 'partials', '*.hbs'),
      ],
    }),
  ].concat(htmlPlugins),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
})




