import Vue from "vue"
import Router from 'vue-router'

import Home from '@/components/Home'
import CreateUser from '@/components/CreateUser'
import Login from '@/components/Login'
import AllUsers from '@/components/AllUsers'


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
      path: '/user',
      name: 'CreateUser',
      component: CreateUser
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'AllUsers',
      component: AllUsers
    }
  ]
})
