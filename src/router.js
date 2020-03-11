import Vue from 'vue'
import Router from 'vue-router'

import Game from '@/views/Game'
import Stage from '@/views/Stage'
import Play from '@/views/Play'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/game',
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
