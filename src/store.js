import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    interfaceUniqId: '',
    currentInterface: {}
  },
  mutations: {
    setInterfaceUniqId(state, interfaceUniqId) {
      state.interfaceUniqId = interfaceUniqId;
    },
    setCurrentInterface(state, currentInterface) {
      state.currentInterface = currentInterface;
    }
  },
  actions: {
    setInterfaceUniqId({ commit }, interfaceUniqId) {
      commit('setInterfaceUniqId', interfaceUniqId);
    },
    setCurrentInterface({ commit }, currentInterface) {
      commit('setCurrentInterface', currentInterface);
    }
  }
});
