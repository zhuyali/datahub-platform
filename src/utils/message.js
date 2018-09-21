import { MessageBox } from 'element-ui'

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
    })
}

export function messageWrapper (type, operation, successCb = defaultCb, failCb = defaultCb, cb = defaultCb) {
  operation()
    .then((res) => {
      if (res && res.success) {
        successCb(res.data)
      } else {
        failCb()
      }
      cb()
    })
    .catch(() => {
      cb()
      failCb()
    })
}
