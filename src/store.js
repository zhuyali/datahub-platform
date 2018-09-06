import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentInterface: {},
    currentInterfaceIndex: 0
  },
  mutations: {
    setCurrentInterface(state, currentInterface) {
      state.currentInterface = currentInterface;
    },
    setCurrentInterfaceIndex(state, currentInterfaceIndex) {
      state.currentInterfaceIndex = currentInterfaceIndex;
    }
  },
  actions: {
    setCurrentInterface({ commit }, currentInterface) {
      commit('setCurrentInterface', currentInterface);
    },
    setCurrentInterfaceIndex({ commit }, currentInterfaceIndex) {
      commit('setCurrentInterfaceIndex', currentInterfaceIndex);
    }
  }
});
