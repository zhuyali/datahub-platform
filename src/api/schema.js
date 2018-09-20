import ajax from '@/utils/ajax'

export function getAllSchema (interfaceUniqId) {
  return ajax.get(`/api/schema?interfaceUniqId=${interfaceUniqId}`)
}

export function updateSchema ({ type, interfaceUniqId, schemaData, enableSchemaValidate }) {
  return ajax.put(`/api/schema/${type}`, { data: {
    enableSchemaValidate,
    interfaceUniqId,
    schemaData
  } })
}
