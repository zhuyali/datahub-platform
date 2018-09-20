import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scenes: [],
    schemas: [],
    proxyList: {},
    interfaceUniqId: '',
    currentInterface: {},
    activeName: 'interface-detail'
  },
  mutations: {
    setScenes (state, scenes) {
      state.scenes = scenes
    },
    setSchemas (state, schemas) {
      state.schemas = schemas
    },
    setActiveName (state, activeName) {
      state.activeName = activeName
    },
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
    setScenes ({ commit }, scenes) {
      commit('setScenes', scenes)
    },
    setSchemas ({ commit }, schemas) {
      commit('setSchemas', schemas)
    },
    setActiveName ({ commit }, activeName) {
      commit('setActiveName', activeName)
    },
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
