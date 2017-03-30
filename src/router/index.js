import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import TFSA from '@/components/TFSA'
import savingsCalculator from '@/components/savingsCalculator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/tfsa',
      name: 'TFSA',
      component: TFSA
    },
    {
      path: '/savings',
      name: 'Savings',
      component: savingsCalculator
    }
  ]
})
