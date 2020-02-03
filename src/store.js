import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    levels: {
      namespaced: true,
      state: {
        easy: {},
        normal: {},
        hard: {},
        insane: {},
      },
      mutations: {
        getStageMode(state, stage) {
          state[stage] = require(`./api/${stage}.js`).default;
        },
      }
    },
  }
})
