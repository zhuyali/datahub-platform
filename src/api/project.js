import ajax from '@/utils/ajax';

export function getAllProject() {
  return ajax.get('/api/project');
}

export function deleteProject(uniqId) {
  return ajax.delete(`/api/project/${uniqId}`);
}

export function addProject({ projectName, description }) {
  return ajax.post('/api/project', { data: {
    projectName,
    description
  } });
}

export function updateProject({ uniqId, projectName, description }) {
  return ajax.put(`/api/project/${uniqId}`, { data: {
    projectName,
    description
  } })
}