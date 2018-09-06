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
  configureWebpack: {
    entry: {
      main: path.join(__dirname, 'src', 'main'),
    },
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
      },
    }
  }
}