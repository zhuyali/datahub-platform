import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    proxyList: {},
    interfaceUniqId: '',
    currentInterface: {}
  },
  mutations: {
    setProxy (state, { interfaceUniqId, enabled }) {
      state.proxyList[interfaceUniqId] = enabled
    },
    setProxyList (state, proxyList) {
      state.proxyList = proxyList
    },
    setInterfaceUniqId (state, interfaceUniqId) {
      state.interfaceUniqId = interfaceUniqId
    },
    setCurrentInterface (state, currentInterface) {
      state.currentInterface = currentInterface
    }
  },
  actions: {
    setProxy ({ commit }, { interfaceUniqId, enabled }) {
      commit('setProxy', { interfaceUniqId, enabled })
    },
    setProxyList ({ commit }, proxyList) {
      commit('setProxyList', proxyList)
    },
    setInterfaceUniqId ({ commit }, interfaceUniqId) {
      commit('setInterfaceUniqId', interfaceUniqId)
    },
    setCurrentInterface ({ commit }, currentInterface) {
      commit('setCurrentInterface', currentInterface)
    }
  }
})
