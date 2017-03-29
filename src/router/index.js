import Vue from 'vue'
import Router from 'vue-router'
import TFSA from '@/components/TFSA'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TFSA',
      component: TFSA
    }
  ]
})
