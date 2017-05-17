import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import TFSA from '@/components/TFSA'
import savingsCalculator from '@/components/savingsCalculator'
import IncomeTracker from '@/components/IncomeTracker'
import StarbucksCalculator from '@/components/StarbucksCalculator'
import CompoundCalculator from '@/components/CompoundCalculator'

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
    },
    {
      path: '/incometracker',
      name: 'IncomeTracker',
      component: IncomeTracker
    },
    {
      path: '/starbucks',
      name: 'Starbuck',
      component: StarbucksCalculator
    },
    {
      path: '/compound',
      name: 'Compound',
      component: CompoundCalculator
    }
  ]
})
