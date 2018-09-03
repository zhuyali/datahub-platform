
import axios from 'axios';
import * as interceptors from './interceptors';

const defaultOption = {
  withCredentials: true
};

function getAxiosInstance(options) {
  const instance = axios.create();

  interceptors.install(instance, options);

  return instance;
}

function transform(data) {
  let fd = [];
  Object.keys(data).map((key) => {
    let item = typeof data[key] === 'object'
      ? JSON.stringify(data[key])
      : data[key];

    item = encodeURIComponent(item);

    fd.push(`${key}=${item}`);
  });
  return fd.join('&');
};

function makeAxios() {
  return function(option) {
    const instance = getAxiosInstance(option);
    return instance(option);
  };
}

function makeGet() {
  return function(url, option) {
    const opt = Object.assign({}, option, defaultOption);
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'get',
      ...opt
    });
  };
}

function makePost() {
  return function(url, option) {
    const opt = Object.assign({}, option, defaultOption);

    if(opt.type && opt.type == 'form-urlencoded') {
      delete opt.type;
      opt.headers = {};
      opt.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      opt.transformRequest = [(data) => {
        if(!data) {
          return data;
        }
        return transform(data);
      }];
    }

    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'post',
      ...opt
    });
  };
}

function makeDelete(axios) {
  return function(url, option) {
    const opt = Object.assign({}, option, defaultOption);
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'delete',
      ...opt
    });
  };
}

function makePut(axios) {
  return function(url, option) {
    const opt = Object.assign({}, option, defaultOption);
    const instance = getAxiosInstance(option);
    return instance({
      url,
      method: 'put',
      ...opt
    });
  };
}

export default {
  axios: makeAxios(),
  get: makeGet(),
  put: makePut(),
  post: makePost(),
  delete: makeDelete(),
  install(Vue) {
      Vue.prototype.$ajax = this;
  }
};