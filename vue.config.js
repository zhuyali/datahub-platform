const path = require('path');
const DataHub = require('macaca-datahub');
const datahubMiddleware = require('datahub-proxy-middleware');

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, 'data'),
  proxy: {
    '^/api': {
      hub: 'datahub-platform',
    },
  },
  view: {
    assetsUrl: 'http://localhost:8080',
  }
};
  
const defaultDatahub = new DataHub({
  port: datahubConfig.port,
});

module.exports = {
  baseUrl: '/dist',
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('url-loader')
      .loader('url-loader')
    const fontRule = config.module.rule('fonts')
    fontRule.uses.clear()
    fontRule
      .use('url-loader')
      .loader('url-loader')
    config
      .plugin('extract-css')
      .tap(args => {
        args[0].filename = 'datahub-view.css'
        args[0].chunkFilename = 'datahub-view.css'
        return args
      })
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.optimization.splitChunks(false)
  },
  css: {
    extract: true
  },
  configureWebpack: {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'datahub-view.js'
    },
    devServer: {
      hot: true,
      host: "0.0.0.0",
      before: app => {
        datahubMiddleware(app)(datahubConfig);
      },
      after: () => {
        defaultDatahub.startServer(datahubConfig).then(() => {
          console.log('datahub ready');
        });
      }
    }
  }
}