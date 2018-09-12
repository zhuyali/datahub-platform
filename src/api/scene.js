import ajax from '@/utils/ajax';

export function getAllScene(interfaceUniqId) {
  return ajax.get(`/api/scene?interfaceUniqId=${interfaceUniqId}`);
}

export function deleteScene(uniqId) {
  return ajax.delete(`/api/scene/${uniqId}`);
}

export function addScene({ interfaceUniqId, sceneName, data }) {
  return ajax.post('/api/scene', { data: {
    interfaceUniqId,
    sceneName,
    data
  } });
}

export function updateScene({ uniqId, sceneName, data }) {
  return ajax.put(`/api/scene/${uniqId}`, { data: {
    sceneName,
    data
  } });
}
