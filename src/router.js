import Vue from 'vue'
import Router from 'vue-router'

import Game from '@/views/Game'
import Stage from '@/views/Stage'
import Play from '@/views/Play'
import Clear from '@/views/Clear'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/game',
    },
    {
      path: '/clear',
      name: 'Clear',
      component: Clear,
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      children: [
        {
          path: ':stage',
          name: 'Stage',
          component: Stage
        },
        {
          path: ':stage/:id',
          name: 'Play',
          component: Play
        }
      ]
    },
    {
      path: '/*',
      redirect: '/game'
    }
  ]
})
