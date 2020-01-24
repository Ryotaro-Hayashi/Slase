import Vue from "vue"
import Router from 'vue-router'

import Home from './views/Home'
import Signin from './views/Signin'
import Login from './views/Login'
import MyPage from './views/MyPage'
import AllUsers from './views/AllUsers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MyPage
    },
    {
      path: '/users',
      name: 'AllUsers',
      component: AllUsers
    }
  ]
})
