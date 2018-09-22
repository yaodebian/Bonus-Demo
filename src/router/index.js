import Vue from 'vue'
import Router from 'vue-router'
import Bonus from '@/views/Bonus'
import BonusComponentTest from '@/views/bonusComponentTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'bonus',
      component: Bonus
    },
    {
      path: '/bonusComponentTest',
      name: 'bonusComponentTest',
      component: BonusComponentTest
    }
  ]
})
