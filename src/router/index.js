import Vue from 'vue'
import Router from 'vue-router'
import Bonus from '@/components/Bonus'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bonus',
      component: Bonus
    }
  ]
})
