import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('./views/LoginView.vue')

export default new Router({
  scrollBehavior: (to, from, savedPosition) => ({ y: 0 }), // scroll to top of the page every time route changes
  mode: 'history',
  linkActiveClass: 'active-page', // router-link active class name
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },

  ]
})
