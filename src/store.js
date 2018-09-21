import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const MAX_RECORD_COUNT = 100

export default new Vuex.Store({
  state: {
    scenes: [],
    schemas: [],
    proxyList: {},
    realTimeData: [],
    currentRealTime: {},
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
    setCurrentRealTime (state, currentRealTime) {
      state.currentRealTime = currentRealTime
    },
    setRealTimeData (state, realTimeData) {
      state.realTimeData.slice(0, MAX_RECORD_COUNT - 1)
      state.realTimeData.unshift(realTimeData)
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
    setCurrentRealTime ({ commit }, currentRealTime) {
      commit('setCurrentRealTime', currentRealTime)
    },
    setRealTimeData ({ commit }, realTimeData) {
      commit('setRealTimeData', realTimeData)
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
