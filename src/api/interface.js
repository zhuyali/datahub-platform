import ajax from '@/utils/ajax';

const { uniqId: projectUniqId } = window.context || {};

export function getAllInterface() {
  return ajax.get(`/api/interface?projectUniqId=${projectUniqId}`);
}

export function getOneInterface(uniqId) {
  return ajax.get(`/api/interface/${uniqId}`);
};

export function deleteInterface(uniqId) {
  return ajax.delete(`/api/interface/${uniqId}`);
}

export function addInterface({ pathname, description, method }) {
  return ajax.post('/api/interface', { data: {
    method,
    pathname,
    description,
    projectUniqId
  } });
}

export function updateInterface({ uniqId, ...payload }) {
  const fileds = [
    'pathname', 'description', 'method',
    'currentScene', 'proxyConfig', 'contextConfig',
  ];
  const postData = {};
  for (const field of fileds) {
    if (payload[field]) postData[field] = payload[field];
  }
  return ajax.put(`/api/interface/${uniqId}`, { data: postData });
}