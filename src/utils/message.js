import { Message, MessageBox } from 'element-ui'

function defaultCb () {}

export function confirmWrapper (type, operation, successCb = defaultCb, failCb = defaultCb, cb = defaultCb) {
  MessageBox.confirm(`确定要${type}吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      messageWrapper(type, operation, successCb, failCb, cb)
    })
    .catch(() => {
      Message.info({ message: `已取消${type}` })
    })
}

export function messageWrapper (type, operation, successCb = defaultCb, failCb = defaultCb, cb = defaultCb) {
  operation()
    .then((res) => {
      cb()
      if (res && res.success) {
        successCb()
        Message.success({ message: res.message || `${type}成功!` })
      } else {
        failCb()
        Message.error({ message: res.message || `${type}失败!` })
      }
    })
    .catch(() => {
      failCb()
      Message.error({ message: `${type}失败!` })
    })
}
