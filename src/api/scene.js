import ajax from '@/utils/ajax';

export function getAllScene(interfaceUniqId) {
  return ajax.get(`/api/scene?interfaceUniqId=${interfaceUniqId}`);
}
