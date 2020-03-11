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
        isVibration: true,
      },
      mutations: {
        getStageMode(state, stage) {
          state[stage] = require(`./api/${stage}.js`).default;
        },
        setVibrate(state, value) {
          state.isVibration = value;
        },
      },
      actions: {
        setGameMode(context, obj) {
          let modes = ['easy', 'normal', 'hard', 'insane']

          for(const i in modes){
            context.commit('getStageMode', modes[i])
          }
        }
      }
    },
  }
})
