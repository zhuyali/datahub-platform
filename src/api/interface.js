import ajax from '@/utils/ajax';

const { uniqId: projectUniqId } = window.context || {};

export function getAllInterface() {
  return ajax.get(`/api/interface?projectUniqId=${projectUniqId}`);
}

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

export function updateInterface({ uniqId, pathname, description, method }) {
  return ajax.put(`/api/interface/${uniqId}`, { data: {
    method,
    pathname,
    description
  } });
}