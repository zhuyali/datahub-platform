import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'

import '@/plugins/element.js'
import '@/assets/style/common.less'
import '@/assets/style/component.less'
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
