import ajax from '@/utils/ajax'

export function switchAllProxy ({ projectUniqId, enabled }) {
  return ajax.post('/api/sdk/switch_all_proxy', { data: {
    projectUniqId,
    enabled
  } })
}
