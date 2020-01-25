import Vue from 'vue'
import Vuex from 'vuex'
import easyAPI from './api/easy.js'
import normalAPI from './api/normal.js'
import hardAPI from './api/hard.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    levels: {
      namespaced: true,
      state: {
        easy: [],
        normal: [],
        hard: []
      },
      mutations: {
        getStageMode(state) {
          state.easy = easyAPI;
          state.normal = normalAPI;
          state.hard = hardAPI;
        },
      }
    },
    splitter: {
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen
          } else {
            state.open = !state.open
          }
        }
      }
    }
  }
})
