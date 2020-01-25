import Vue from 'vue'
import Router from 'vue-router'

import Template from '@/views/Game'
import Play from '@/views/Play'
import Clear from '@/views/Clear'
// import Score from '@/views/Score'

Vue.use(Router)

const extend = name => ({ name, extends: Template });

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
      component: extend('Game'),
      children: [
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
    // {
    //   path: '/',
    //   redirect: '/game'
    // },
    // {
    //   path: '/game',
    //   component: Game
    // },
    // {
    //   path: '/game/:id',
    //   props: true,
    //   component: Play
    // },
    // {
    //   path: '/score',
    //   component: Score
    // }
  ]
})
