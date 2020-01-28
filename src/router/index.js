import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/pages/Landing'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      props: {}
    }
  ]
})
