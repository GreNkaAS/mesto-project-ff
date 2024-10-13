const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js', // Входной файл
  output: {
    filename: 'bundle.js', // Имя выходного JS-файла
    path: path.resolve(__dirname, 'dist'), // Папка для сборки
    clean: true, // Очистка папки dist перед сборкой
  },
  mode: 'development', // Можно менять на 'production' для релизной сборки
  devServer: {
    static: './dist', // Папка для статических файлов
    port: 8080, // Порт для локального сервера
    open: true, // Автоматическое открытие браузера
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Регулярное выражение для JS-файлов
        exclude: /node_modules/, // Исключаем node_modules
        use: {
          loader: 'babel-loader', // Транспиляция с Babel
        },
      },
      {
        test: /\.css$/, // Регулярное выражение для CSS-файлов
        use: [
          MiniCssExtractPlugin.loader, // Извлечение CSS в отдельные файлы
          'css-loader', // Поддержка CSS-импорта
          'postcss-loader', // Поддержка PostCSS (автопрефиксы)
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/i, // Изображения и шрифты
        type: 'asset/resource', // Загрузка как ресурсы
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон HTML-файла для подстановки CSS и JS
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Имя выходного CSS-файла
    }),
  ],
  optimization: {
    minimizer: [
      `...`, // Оставляем стандартные минимизаторы
      new CssMinimizerPlugin(), // Минификация CSS
    ],
  },
};
