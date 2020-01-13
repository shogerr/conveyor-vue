const monacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new monacoWebpackPlugin()]
  }
};
