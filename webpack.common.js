module.exports = {
  entry: "./src/js/app.js",
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(webp|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
